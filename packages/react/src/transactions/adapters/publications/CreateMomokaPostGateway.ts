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
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOffChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { Data, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError } from '../relayer';

export class CreateMomokaPostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    IOffChainProtocolCallGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<DataTransaction<CreatePostRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

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
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
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
      const result = await this.createTypedData(input);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
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

  private createRequestFallback(
    request: CreatePostRequest,
    result: CreateMomokaPostBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreatePostRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('post', [result.typedData.message]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
