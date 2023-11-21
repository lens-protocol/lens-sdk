import {
  SafeApolloClient,
  omitTypename,
  RelaySuccess,
  QuoteOnchainData,
  QuoteOnchainVariables,
  QuoteOnchainDocument,
  OnchainQuoteRequest,
  CreateOnchainQuoteBroadcastItemResult,
  CreateOnchainQuoteTypedDataData,
  CreateOnchainQuoteTypedDataVariables,
  CreateOnchainQuoteTypedDataDocument,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateQuoteRequest } from '@lens-protocol/domain/use-cases/publications';
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
import { resolveOpenActionModuleInput } from './resolveOpenActionModuleInput';
import { resolveReferenceModuleInput } from './resolveReferenceModuleInput';

export class CreateOnChainQuoteGateway
  implements
    IDelegatedTransactionGateway<CreateQuoteRequest>,
    ISignedOnChainGateway<CreateQuoteRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateQuoteRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateQuoteRequest,
  ): PromiseResult<NativeTransaction<CreateQuoteRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

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
    request: CreateQuoteRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateQuoteRequest>> {
    const input = this.resolveOnchainQuoteRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: CreateQuoteRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveOnchainQuoteRequest(request);

    const { data } = await this.apolloClient.mutate<QuoteOnchainData, QuoteOnchainVariables>({
      mutation: QuoteOnchainDocument,
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
    request: OnchainQuoteRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainQuoteBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainQuoteTypedDataData,
      CreateOnchainQuoteTypedDataVariables
    >({
      mutation: CreateOnchainQuoteTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveOnchainQuoteRequest(request: CreateQuoteRequest): OnchainQuoteRequest {
    return {
      contentURI: request.metadata,
      quoteOn: request.quoteOn,
      openActionModules: request.actions?.map(resolveOpenActionModuleInput),
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    };
  }

  private createRequestFallback(
    request: CreateQuoteRequest,
    result: CreateOnchainQuoteBroadcastItemResult,
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
