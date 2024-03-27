import {
  CommentOnchainData,
  CommentOnchainDocument,
  CommentOnchainVariables,
  CreateOnchainCommentBroadcastItemResult,
  CreateOnchainCommentTypedDataData,
  CreateOnchainCommentTypedDataDocument,
  CreateOnchainCommentTypedDataVariables,
  OnchainCommentRequest,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateCommentRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreateOnChainCommentGateway
  extends AbstractContractCallGateway<CreateCommentRequest>
  implements
    IDelegatedTransactionGateway<CreateCommentRequest>,
    ISignedOnChainGateway<CreateCommentRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateCommentRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: CreateCommentRequest,
  ): PromiseResult<NativeTransaction<CreateCommentRequest>, BroadcastingError> {
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
    request: CreateCommentRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateCommentRequest>> {
    const input = this.resolveOnchainCommentRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected override async createCallDetails(
    request: CreateCommentRequest,
  ): Promise<ContractCallDetails> {
    const input = this.resolveOnchainCommentRequest(request);
    const result = await this.createTypedData(input);
    return this.createCommentCallDetails(result);
  }

  private async relayWithProfileManager(
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
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private createCommentCallDetails(
    result: CreateOnchainCommentBroadcastItemResult,
  ): ContractCallDetails {
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
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
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
      commentOn: request.commentOn,
      commentOnReferenceModuleData: request.commentOnReferenceData,
      contentURI: request.metadata,
      openActionModules: request.actions?.map(resolveOpenActionModuleInput),
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
      referrers: resolveOnchainReferrers(request.referrers),
    };
  }
}
