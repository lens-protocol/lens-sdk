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
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedMomokaGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
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
    const result = await this.relayWithProfileManager(request);

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
    });
  }

  private async relayWithProfileManager(
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
      return handleRelayError(data.result);
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
}
