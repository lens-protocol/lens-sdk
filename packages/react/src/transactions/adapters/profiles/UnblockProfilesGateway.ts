import {
  CreateUnblockProfilesBroadcastItemResult,
  CreateUnblockProfilesTypedDataData,
  CreateUnblockProfilesTypedDataDocument,
  CreateUnblockProfilesTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  UnblockData,
  UnblockDocument,
  UnblockVariables,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { IUnsignedProtocolCall, Nonce, Transaction } from '@lens-protocol/domain/entities';
import { UnblockProfilesRequest } from '@lens-protocol/domain/src/use-cases/profile/UnblockProfiles';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError } from '../relayer';

export class UnblockProfilesGateway
  implements
    IDelegatedTransactionGateway<UnblockProfilesRequest>,
    IOnChainProtocolCallGateway<UnblockProfilesRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UnblockProfilesRequest>,
  ) {}

  async createDelegatedTransaction(
    request: UnblockProfilesRequest,
  ): PromiseResult<Transaction<UnblockProfilesRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) {
      return failure(result.error);
    }

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
    request: UnblockProfilesRequest,
    nonceOverride?: number | undefined,
  ): Promise<IUnsignedProtocolCall<UnblockProfilesRequest>> {
    const result = await this.createTypedData(request, nonceOverride);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: result.typedData,
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: UnblockProfilesRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<UnblockData, UnblockVariables>({
      mutation: UnblockDocument,
      variables: {
        request: {
          profiles: request.profileIds,
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

  private async createTypedData(
    request: UnblockProfilesRequest,
    nonce?: Nonce,
  ): Promise<CreateUnblockProfilesBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateUnblockProfilesTypedDataData,
      CreateUnblockProfilesTypedDataVariables
    >({
      mutation: CreateUnblockProfilesTypedDataDocument,
      variables: {
        request: {
          profiles: request.profileIds,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createRequestFallback(
    request: UnblockProfilesRequest,
    result: CreateUnblockProfilesBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<UnblockProfilesRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setBlockStatus', [
      result.typedData.message.byProfileId,
      result.typedData.message.idsOfProfilesToSetBlockStatus,
      result.typedData.message.blockStatus,
    ]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
