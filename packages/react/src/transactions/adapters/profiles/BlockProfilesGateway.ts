import {
  BlockData,
  BlockDocument,
  BlockVariables,
  CreateBlockProfilesBroadcastItemResult,
  CreateBlockProfilesTypedDataData,
  CreateBlockProfilesTypedDataDocument,
  CreateBlockProfilesTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { IUnsignedProtocolCall, Nonce, Transaction } from '@lens-protocol/domain/entities';
import { BlockProfilesRequest } from '@lens-protocol/domain/src/use-cases/profile/BlockProfiles';
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

export class BlockProfilesGateway
  implements
    IDelegatedTransactionGateway<BlockProfilesRequest>,
    ISignedOnChainGateway<BlockProfilesRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<BlockProfilesRequest>,
  ) {}

  async createDelegatedTransaction(
    request: BlockProfilesRequest,
  ): PromiseResult<Transaction<BlockProfilesRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) {
      return result;
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
    request: BlockProfilesRequest,
    nonceOverride?: number | undefined,
  ): Promise<IUnsignedProtocolCall<BlockProfilesRequest>> {
    const result = await this.createTypedData(request, nonceOverride);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: BlockProfilesRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<BlockData, BlockVariables>({
      mutation: BlockDocument,
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
    request: BlockProfilesRequest,
    nonce?: Nonce,
  ): Promise<CreateBlockProfilesBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateBlockProfilesTypedDataData,
      CreateBlockProfilesTypedDataVariables
    >({
      mutation: CreateBlockProfilesTypedDataDocument,
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
    request: BlockProfilesRequest,
    result: CreateBlockProfilesBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<BlockProfilesRequest> {
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
