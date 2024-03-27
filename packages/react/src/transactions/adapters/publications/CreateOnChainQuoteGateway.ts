import {
  CreateOnchainQuoteBroadcastItemResult,
  CreateOnchainQuoteTypedDataData,
  CreateOnchainQuoteTypedDataDocument,
  CreateOnchainQuoteTypedDataVariables,
  OnchainQuoteRequest,
  QuoteOnchainData,
  QuoteOnchainDocument,
  QuoteOnchainVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
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

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import { resolveOnchainReferrers } from '../referrals';
import { handleRelayError } from '../relayer';
import { resolveOpenActionModuleInput } from './resolveOpenActionModuleInput';
import { resolveReferenceModuleInput } from './resolveReferenceModuleInput';

export class CreateOnChainQuoteGateway
  extends AbstractContractCallGateway<CreateQuoteRequest>
  implements
    IDelegatedTransactionGateway<CreateQuoteRequest>,
    ISignedOnChainGateway<CreateQuoteRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateQuoteRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: CreateQuoteRequest,
  ): PromiseResult<NativeTransaction<CreateQuoteRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      relayerTxId: result.value.txId,
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
    });
  }

  protected override async createCallDetails(
    request: CreateQuoteRequest,
  ): Promise<ContractCallDetails> {
    const input = this.resolveOnchainQuoteRequest(request);
    const result = await this.createTypedData(input);
    return this.createQuoteCallDetails(result);
  }

  private async relayWithProfileManager(
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
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private createQuoteCallDetails(
    result: CreateOnchainQuoteBroadcastItemResult,
  ): ContractCallDetails {
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
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
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
      quoteOnReferenceModuleData: request.quoteOnReferenceData,
      openActionModules: request.actions?.map(resolveOpenActionModuleInput),
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
      referrers: resolveOnchainReferrers(request.referrers),
    };
  }
}
