import {
  CreateLinkHandleToProfileBroadcastItemResult,
  CreateLinkHandleToProfileTypedDataData,
  CreateLinkHandleToProfileTypedDataDocument,
  CreateLinkHandleToProfileTypedDataVariables,
  LinkHandleToProfileData,
  LinkHandleToProfileDocument,
  LinkHandleToProfileVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensTokenHandleRegistry } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { LinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
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

export class LinkHandleGateway
  extends AbstractContractCallGateway<LinkHandleRequest>
  implements
    IDelegatedTransactionGateway<LinkHandleRequest>,
    ISignedOnChainGateway<LinkHandleRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<LinkHandleRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: LinkHandleRequest,
  ): PromiseResult<NativeTransaction<LinkHandleRequest>, BroadcastingError> {
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
    request: LinkHandleRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<LinkHandleRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected async createCallDetails(request: LinkHandleRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createLinkCallDetails(result);
  }

  private async relayWithProfileManager(
    request: LinkHandleRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      LinkHandleToProfileData,
      LinkHandleToProfileVariables
    >({
      mutation: LinkHandleToProfileDocument,
      variables: {
        request: {
          handle: request.fullHandle,
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createTypedData(request: LinkHandleRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateLinkHandleToProfileTypedDataData,
      CreateLinkHandleToProfileTypedDataVariables
    >({
      mutation: CreateLinkHandleToProfileTypedDataDocument,
      variables: {
        request: {
          handle: request.fullHandle,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createLinkCallDetails(
    result: CreateLinkHandleToProfileBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensTokenHandleRegistry(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('link', [
      result.typedData.message.handleId,
      result.typedData.message.profileId,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
