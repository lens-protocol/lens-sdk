import {
  SafeApolloClient,
  omitTypename,
  CreateMomokaPublicationResult,
  QuoteOnMomokaData,
  QuoteOnMomokaVariables,
  QuoteOnMomokaDocument,
  MomokaQuoteRequest,
  CreateMomokaQuoteBroadcastItemResult,
  CreateMomokaQuoteTypedDataData,
  CreateMomokaQuoteTypedDataVariables,
  CreateMomokaQuoteTypedDataDocument,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateQuoteRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreateMomokaQuoteGateway
  implements
    IDelegatedTransactionGateway<CreateQuoteRequest>,
    ISignedMomokaGateway<CreateQuoteRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateQuoteRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateQuoteRequest,
  ): PromiseResult<DataTransaction<CreateQuoteRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createDataTransaction({
      id: result.value.id,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreateQuoteRequest,
  ): Promise<UnsignedProtocolCall<CreateQuoteRequest>> {
    const input = this.resolveMomokaQuoteRequest(request);
    const result = await this.createTypedData(input);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: CreateQuoteRequest,
  ): PromiseResult<CreateMomokaPublicationResult, BroadcastingError> {
    const input = this.resolveMomokaQuoteRequest(request);

    const { data } = await this.apolloClient.mutate<QuoteOnMomokaData, QuoteOnMomokaVariables>({
      mutation: QuoteOnMomokaDocument,
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

  private resolveMomokaQuoteRequest(request: CreateQuoteRequest): MomokaQuoteRequest {
    return {
      contentURI: request.metadata,
      quoteOn: request.quoteOn,
    };
  }

  private async createTypedData(
    request: MomokaQuoteRequest,
  ): Promise<CreateMomokaQuoteBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateMomokaQuoteTypedDataData,
      CreateMomokaQuoteTypedDataVariables
    >({
      mutation: CreateMomokaQuoteTypedDataDocument,
      variables: { request },
    });
    return data.result;
  }

  private createRequestFallback(
    request: CreateQuoteRequest,
    result: CreateMomokaQuoteBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreateQuoteRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('quote', [
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
