import {
  CreateMomokaMirrorBroadcastItemResult,
  CreateMomokaMirrorTypedDataData,
  CreateMomokaMirrorTypedDataDocument,
  CreateMomokaMirrorTypedDataVariables,
  CreateMomokaPublicationResult,
  MirrorOnMomokaData,
  MirrorOnMomokaDocument,
  MirrorOnMomokaVariables,
  MomokaMirrorRequest,
  omitTypename,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
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

export class CreateMomokaMirrorGateway
  implements
    IDelegatedTransactionGateway<CreateMirrorRequest>,
    ISignedMomokaGateway<CreateMirrorRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateMirrorRequest>,
  ) {}

  async createDelegatedTransaction(
    request: CreateMirrorRequest,
  ): PromiseResult<DataTransaction<CreateMirrorRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createDataTransaction({
      id: result.value.id,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: CreateMirrorRequest,
  ): Promise<UnsignedProtocolCall<CreateMirrorRequest>> {
    const input = this.resolveMomokaMirrorRequest(request);
    const result = await this.createTypedData(input);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createRequestFallback(request, result),
    });
  }

  private async broadcast(
    request: CreateMirrorRequest,
  ): PromiseResult<CreateMomokaPublicationResult, BroadcastingError> {
    const input = this.resolveMomokaMirrorRequest(request);

    const { data } = await this.apolloClient.mutate<MirrorOnMomokaData, MirrorOnMomokaVariables>({
      mutation: MirrorOnMomokaDocument,
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

  private resolveMomokaMirrorRequest(request: CreateMirrorRequest): MomokaMirrorRequest {
    return {
      mirrorOn: request.mirrorOn,
    };
  }

  private async createTypedData(
    request: MomokaMirrorRequest,
  ): Promise<CreateMomokaMirrorBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateMomokaMirrorTypedDataData,
      CreateMomokaMirrorTypedDataVariables
    >({
      mutation: CreateMomokaMirrorTypedDataDocument,
      variables: { request },
    });
    return data.result;
  }

  private createRequestFallback(
    request: CreateMirrorRequest,
    result: CreateMomokaMirrorBroadcastItemResult,
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
