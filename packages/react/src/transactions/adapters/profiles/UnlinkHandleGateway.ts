import {
  SafeApolloClient,
  omitTypename,
  RelaySuccess,
  UnlinkHandleFromProfileDocument,
  UnlinkHandleFromProfileData,
  UnlinkHandleFromProfileVariables,
  CreateUnlinkHandleFromProfileTypedDataData,
  CreateUnlinkHandleFromProfileTypedDataVariables,
  CreateUnlinkHandleFromProfileTypedDataDocument,
  CreateUnlinkHandleFromProfileBroadcastItemResult,
} from '@lens-protocol/api-bindings';
import { lensTokenHandleRegistry } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { UnlinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
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

export class UnlinkHandleGateway
  implements
    IDelegatedTransactionGateway<UnlinkHandleRequest>,
    ISignedOnChainGateway<UnlinkHandleRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UnlinkHandleRequest>,
  ) {}

  async createDelegatedTransaction(
    request: UnlinkHandleRequest,
  ): PromiseResult<NativeTransaction<UnlinkHandleRequest>, BroadcastingError> {
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
    request: UnlinkHandleRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UnlinkHandleRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async relayWithProfileManager(
    request: UnlinkHandleRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      UnlinkHandleFromProfileData,
      UnlinkHandleFromProfileVariables
    >({
      mutation: UnlinkHandleFromProfileDocument,
      variables: {
        request: {
          handle: request.handle,
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

  private async createTypedData(request: UnlinkHandleRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateUnlinkHandleFromProfileTypedDataData,
      CreateUnlinkHandleFromProfileTypedDataVariables
    >({
      mutation: CreateUnlinkHandleFromProfileTypedDataDocument,
      variables: {
        request: {
          handle: request.handle,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createRequestFallback(
    request: UnlinkHandleRequest,
    result: CreateUnlinkHandleFromProfileBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<UnlinkHandleRequest> {
    const contract = lensTokenHandleRegistry(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('unlink', [
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
