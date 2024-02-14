import {
  CreateUnfollowBroadcastItemResult,
  CreateUnfollowTypedDataData,
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  UnfollowData,
  UnfollowDocument,
  UnfollowVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedOnChainGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

export class UnfollowProfileGateway
  extends AbstractContractCallGateway<UnfollowRequest>
  implements IDelegatedTransactionGateway<UnfollowRequest>, ISignedOnChainGateway<UnfollowRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UnfollowRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: UnfollowRequest,
  ): PromiseResult<NativeTransaction<UnfollowRequest>, BroadcastingError> {
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
    request: UnfollowRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UnfollowRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected async createCallDetails(request: UnfollowRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createUnfollowCallData(result);
  }

  private async relayWithProfileManager(
    request: UnfollowRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<UnfollowData, UnfollowVariables>({
      mutation: UnfollowDocument,
      variables: {
        request: {
          unfollow: [request.profileId],
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createTypedData(request: UnfollowRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateUnfollowTypedDataData,
      CreateUnfollowTypedDataVariables
    >({
      mutation: CreateUnfollowTypedDataDocument,
      variables: {
        request: {
          unfollow: [request.profileId],
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createUnfollowCallData(result: CreateUnfollowBroadcastItemResult): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('unfollow', [
      result.typedData.message.unfollowerProfileId,
      result.typedData.message.idsOfProfilesToUnfollow,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
