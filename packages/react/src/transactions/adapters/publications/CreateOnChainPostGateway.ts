import {
  CreateOnchainPostBroadcastItemResult,
  CreateOnchainPostTypedDataData,
  CreateOnchainPostTypedDataDocument,
  CreateOnchainPostTypedDataVariables,
  OnchainPostRequest,
  PostOnchainData,
  PostOnchainDocument,
  PostOnchainVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
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
import { handleRelayError } from '../relayer';
import { resolveOpenActionModuleInput } from './resolveOpenActionModuleInput';
import { resolveReferenceModuleInput } from './resolveReferenceModuleInput';

export class CreateOnChainPostGateway
  extends AbstractContractCallGateway<CreatePostRequest>
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    ISignedOnChainGateway<CreatePostRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<NativeTransaction<CreatePostRequest>, BroadcastingError> {
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
    request: CreatePostRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreatePostRequest>> {
    const input = this.resolveOnchainPostRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected override async createCallDetails(
    request: CreatePostRequest,
  ): Promise<ContractCallDetails> {
    const input = this.resolveOnchainPostRequest(request);
    const result = await this.createTypedData(input);
    return this.createPostCallDetails(result);
  }

  private async relayWithProfileManager(
    request: CreatePostRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveOnchainPostRequest(request);

    const { data } = await this.apolloClient.mutate<PostOnchainData, PostOnchainVariables>({
      mutation: PostOnchainDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private createPostCallDetails(result: CreateOnchainPostBroadcastItemResult): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('post', [
      {
        profileId: result.typedData.message.profileId,
        contentURI: result.typedData.message.contentURI,
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
    request: OnchainPostRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainPostBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainPostTypedDataData,
      CreateOnchainPostTypedDataVariables
    >({
      mutation: CreateOnchainPostTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveOnchainPostRequest(request: CreatePostRequest): OnchainPostRequest {
    return {
      contentURI: request.metadata,
      openActionModules: request.actions?.map(resolveOpenActionModuleInput),
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    };
  }
}
