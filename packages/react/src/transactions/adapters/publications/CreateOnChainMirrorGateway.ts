import {
  CreateOnchainMirrorBroadcastItemResult,
  CreateOnchainMirrorTypedDataData,
  CreateOnchainMirrorTypedDataDocument,
  CreateOnchainMirrorTypedDataVariables,
  MirrorOnchainData,
  MirrorOnchainDocument,
  MirrorOnMomokaVariables,
  omitTypename,
  OnchainMirrorRequest,
  RelaySuccess,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreateOnChainMirrorGateway
  implements
    IDelegatedTransactionGateway<CreateMirrorRequest>,
    ISignedOnChainGateway<CreateMirrorRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateMirrorRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateMirrorRequest,
  ): PromiseResult<NativeTransaction<CreateMirrorRequest>, BroadcastingError> {
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
    request: CreateMirrorRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateMirrorRequest>> {
    const input = this.resolveOnchainMirrorRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: CreateMirrorRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveOnchainMirrorRequest(request);

    const { data } = await this.apolloClient.mutate<MirrorOnchainData, MirrorOnMomokaVariables>({
      mutation: MirrorOnchainDocument,
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
    request: OnchainMirrorRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainMirrorBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainMirrorTypedDataData,
      CreateOnchainMirrorTypedDataVariables
    >({
      mutation: CreateOnchainMirrorTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveOnchainMirrorRequest(request: CreateMirrorRequest): OnchainMirrorRequest {
    return {
      mirrorOn: request.mirrorOn,
    };
  }

  private createRequestFallback(
    request: CreateMirrorRequest,
    result: CreateOnchainMirrorBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<CreateMirrorRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('mirror', [
      {
        profileId: result.typedData.message.profileId,
        metadataURI: result.typedData.message.metadataURI,
        pointedProfileId: result.typedData.message.pointedProfileId,
        pointedPubId: result.typedData.message.pointedPubId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        referenceModuleData: result.typedData.message.referenceModuleData,
      },
    ]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
