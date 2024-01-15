import {
  CreateFollowTypedDataData,
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataVariables,
  Follow,
  FollowRequest as TypedDataFollowRequest,
  omitTypename,
  RelaySuccess,
  SafeApolloClient,
  CreateFollowBroadcastItemResult,
  FollowData,
  FollowVariables,
  FollowDocument,
  FollowLensManagerRequest,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  FollowRequest,
  FreeFollowRequest,
  isPaidFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IPaidTransactionGateway,
  ISignedOnChainGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { LensConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

function resolveProfileFollow(request: FollowRequest): Follow[] {
  if (isPaidFollowRequest(request)) {
    return [
      {
        profileId: request.profileId,
        followModule: {
          feeFollowModule: {
            amount: {
              currency: request.fee.amount.asset.address,
              value: request.fee.amount.toSignificantDigits(),
            },
          },
        },
      },
    ];
  }

  return [{ profileId: request.profileId }];
}

export class FollowProfileGateway
  extends AbstractContractCallGateway<FollowRequest>
  implements
    IDelegatedTransactionGateway<FreeFollowRequest>,
    ISignedOnChainGateway<FollowRequest>,
    IPaidTransactionGateway<FollowRequest>
{
  constructor(
    config: LensConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<FreeFollowRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: FreeFollowRequest,
  ): PromiseResult<NativeTransaction<FreeFollowRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      relayerTxId: result.value.txId,
      txHash: result.value.txHash,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<FollowRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected override async createEncodedData(request: FollowRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createFollowCallDetails(result);
  }

  private async relayWithProfileManager(
    request: FreeFollowRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<FollowData, FollowVariables>({
      mutation: FollowDocument,
      variables: {
        request: this.resolveFollowLensManagerRequest(request),
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createTypedData(request: FollowRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateFollowTypedDataData,
      CreateFollowTypedDataVariables
    >({
      mutation: CreateFollowTypedDataDocument,
      variables: {
        request: this.resolveTypedDataFollowRequest(request),
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveFollowLensManagerRequest(request: FreeFollowRequest): FollowLensManagerRequest {
    return {
      follow: resolveProfileFollow(request),
    };
  }

  private resolveTypedDataFollowRequest(request: FollowRequest): TypedDataFollowRequest {
    return {
      follow: resolveProfileFollow(request),
    };
  }

  private createFollowCallDetails(result: CreateFollowBroadcastItemResult): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('follow', [
      result.typedData.message.followerProfileId,
      result.typedData.message.idsOfProfilesToFollow,
      result.typedData.message.followTokenIds,
      result.typedData.message.datas,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
