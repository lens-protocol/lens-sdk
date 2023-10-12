import {
  SafeApolloClient,
  omitTypename,
  RelaySuccess,
  CreateOnchainPostTypedDataData,
  CreateOnchainPostBroadcastItemResult,
  CreateOnchainPostTypedDataVariables,
  CreateOnchainPostTypedDataDocument,
  OnchainPostRequest,
  PostOnchainData,
  PostOnchainVariables,
  PostOnchainDocument,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
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
import { resolveReferenceModuleInput } from './resolveReferenceModuleInput';

export class CreateOnChainPostGateway
  implements
    IDelegatedTransactionGateway<CreatePostRequest>,
    IOnChainProtocolCallGateway<CreatePostRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreatePostRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreatePostRequest,
  ): PromiseResult<NativeTransaction<CreatePostRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;
    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: receipt.txId,
      txHash: receipt.txHash,
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
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
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
      const result = await this.createTypedData(input);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
    }

    return success(data.result);
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
      // TODO open actions
      referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    };
  }

  private createRequestFallback(
    request: CreatePostRequest,
    result: CreateOnchainPostBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreatePostRequest> {
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
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
