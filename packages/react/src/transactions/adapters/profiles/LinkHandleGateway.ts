import {
  SafeApolloClient,
  omitTypename,
  RelaySuccess,
  CreateLinkHandleToProfileTypedDataVariables,
  LinkHandleToProfileVariables,
  LinkHandleToProfileDocument,
  LinkHandleToProfileData,
  CreateLinkHandleToProfileTypedDataData,
  CreateLinkHandleToProfileTypedDataDocument,
  CreateLinkHandleToProfileBroadcastItemResult,
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

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError } from '../relayer';

export class LinkHandleGateway
  implements
    IDelegatedTransactionGateway<LinkHandleRequest>,
    ISignedOnChainGateway<LinkHandleRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<LinkHandleRequest>,
  ) {}

  async createDelegatedTransaction(
    request: LinkHandleRequest,
  ): PromiseResult<NativeTransaction<LinkHandleRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: result.value.txId,
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
      fallback: this.createRequestFallback(request, result),
    });
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
      const result = await this.createTypedData(request);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
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

  private createRequestFallback(
    request: LinkHandleRequest,
    result: CreateLinkHandleToProfileBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<LinkHandleRequest> {
    const contract = lensTokenHandleRegistry(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('link', [
      result.typedData.message.handleId,
      result.typedData.message.profileId,
    ]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
