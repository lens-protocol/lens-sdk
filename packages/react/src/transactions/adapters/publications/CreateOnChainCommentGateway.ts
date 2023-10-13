import {
  SafeApolloClient,
  omitTypename,
  RelaySuccess,
  CommentOnchainData,
  CommentOnchainVariables,
  CommentOnchainDocument,
  OnchainCommentRequest,
  CreateOnchainCommentBroadcastItemResult,
  CreateOnchainCommentTypedDataData,
  CreateOnchainCommentTypedDataVariables,
  CreateOnchainCommentTypedDataDocument,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError } from '../relayer';
import { resolveOpenActionModuleInput } from './resolveOpenActionModuleInput';
import { resolveReferenceModuleInput } from './resolveReferenceModuleInput';

export class CreateOnChainCommentGateway
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    IOnChainProtocolCallGateway<CreateCommentRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateCommentRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateCommentRequest,
  ): PromiseResult<NativeTransaction<CreateCommentRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return failure(result.error);

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
    request: CreateCommentRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateCommentRequest>> {
    const input = this.resolveOnchainCommentRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: CreateCommentRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveOnchainCommentRequest(request);

    const { data } = await this.apolloClient.mutate<CommentOnchainData, CommentOnchainVariables>({
      mutation: CommentOnchainDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      const result = await this.createTypedData(input);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
    }

    return success(data.result);
  }

  private async createTypedData(
    request: OnchainCommentRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainCommentBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainCommentTypedDataData,
      CreateOnchainCommentTypedDataVariables
    >({
      mutation: CreateOnchainCommentTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveOnchainCommentRequest(request: CreateCommentRequest): OnchainCommentRequest {
    return {
      contentURI: request.metadata,
      commentOn: request.commentOn,
      openActionModules: request.actions?.map(resolveOpenActionModuleInput),
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    };
  }

  private createRequestFallback(
    request: CreateCommentRequest,
    result: CreateOnchainCommentBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreateCommentRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('comment', [
      result.typedData.message,
    ]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
