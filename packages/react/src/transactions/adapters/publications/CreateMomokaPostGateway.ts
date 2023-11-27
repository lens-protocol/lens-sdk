import {
  SafeApolloClient,
  omitTypename,
  CreateMomokaPublicationResult,
  CreateMomokaPostTypedDataData,
  CreateMomokaPostTypedDataVariables,
  CreateMomokaPostTypedDataDocument,
  PostOnMomokaData,
  PostOnMomokaVariables,
  PostOnMomokaDocument,
  MomokaPostRequest,
  CreateMomokaPostBroadcastItemResult,
} from '@lens-protocol/api-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedMomokaGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

export class CreateMomokaPostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    ISignedMomokaGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<DataTransaction<CreatePostRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createDataTransaction({
      id: result.value.id,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreatePostRequest,
  ): Promise<UnsignedProtocolCall<CreatePostRequest>> {
    const input = this.resolveMomokaPostRequest(request);
    const result = await this.createTypedData(input);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  private async relayWithProfileManager(
    request: CreatePostRequest,
  ): PromiseResult<CreateMomokaPublicationResult, BroadcastingError> {
    const input = this.resolveMomokaPostRequest(request);

    const { data } = await this.apolloClient.mutate<PostOnMomokaData, PostOnMomokaVariables>({
      mutation: PostOnMomokaDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private resolveMomokaPostRequest(request: CreatePostRequest): MomokaPostRequest {
    return {
      contentURI: request.metadata,
    };
  }

  private async createTypedData(
    request: MomokaPostRequest,
  ): Promise<CreateMomokaPostBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateMomokaPostTypedDataData,
      CreateMomokaPostTypedDataVariables
    >({
      mutation: CreateMomokaPostTypedDataDocument,
      variables: { request },
    });
    return data.result;
  }
}
