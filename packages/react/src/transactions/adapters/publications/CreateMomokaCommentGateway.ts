import {
  SafeApolloClient,
  omitTypename,
  CreateMomokaPublicationResult,
  CommentOnMomokaData,
  CommentOnMomokaVariables,
  CommentOnMomokaDocument,
  MomokaCommentRequest,
  CreateMomokaCommentBroadcastItemResult,
  CreateMomokaCommentTypedDataData,
  CreateMomokaCommentTypedDataVariables,
  CreateMomokaCommentTypedDataDocument,
} from '@lens-protocol/api-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedMomokaGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

export class CreateMomokaCommentGateway
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    ISignedMomokaGateway<CreateCommentRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateCommentRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateCommentRequest,
  ): PromiseResult<DataTransaction<CreateCommentRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createDataTransaction({
      id: result.value.id,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreateCommentRequest,
  ): Promise<UnsignedProtocolCall<CreateCommentRequest>> {
    const input = this.resolveMomokaCommentRequest(request);
    const result = await this.createTypedData(input);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  private async relayWithProfileManager(
    request: CreateCommentRequest,
  ): PromiseResult<CreateMomokaPublicationResult, BroadcastingError> {
    const input = this.resolveMomokaCommentRequest(request);

    const { data } = await this.apolloClient.mutate<CommentOnMomokaData, CommentOnMomokaVariables>({
      mutation: CommentOnMomokaDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private resolveMomokaCommentRequest(request: CreateCommentRequest): MomokaCommentRequest {
    return {
      contentURI: request.metadata,
      commentOn: request.commentOn,
    };
  }

  private async createTypedData(
    request: MomokaCommentRequest,
  ): Promise<CreateMomokaCommentBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateMomokaCommentTypedDataData,
      CreateMomokaCommentTypedDataVariables
    >({
      mutation: CreateMomokaCommentTypedDataDocument,
      variables: { request },
    });
    return data.result;
  }
}
