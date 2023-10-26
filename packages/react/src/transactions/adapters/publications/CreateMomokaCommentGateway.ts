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
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedMomokaGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { Data, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
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
    const result = await this.broadcast(request);

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
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
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
      const result = await this.createTypedData(input);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
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

  private createRequestFallback(
    request: CreateCommentRequest,
    result: CreateMomokaCommentBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreateCommentRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('comment', [
      {
        profileId: result.typedData.message.profileId,
        contentURI: result.typedData.message.contentURI,
        pointedProfileId: result.typedData.message.pointedProfileId,
        pointedPubId: result.typedData.message.pointedPubId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        referenceModuleData: result.typedData.message.referenceModuleData,
        actionModules: result.typedData.message.actionModules,
        actionModulesInitDatas: result.typedData.message.actionModulesInitDatas,
        referenceModule: result.typedData.message.referenceModule,
        referenceModuleInitData: result.typedData.message.referenceModuleInitData,
      },
    ]);

    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
