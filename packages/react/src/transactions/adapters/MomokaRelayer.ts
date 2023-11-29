import {
  BroadcastOnMomokaData,
  BroadcastOnMomokaDocument,
  BroadcastOnMomokaVariables,
  CreateMomokaPublicationResult,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  IMomokaRelayer,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  assertError,
  failure,
  ILogger,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

import { SignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { handleRelayError } from './relayer';

export class MomokaRelayer implements IMomokaRelayer<CreatePostRequest> {
  constructor(
    private apolloClient: SafeApolloClient,
    private factory: ITransactionFactory<ProtocolTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relaySignedMomoka<T extends ProtocolTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<DataTransaction<T>, BroadcastingError> {
    const result = await this.relayWithProfileManager(signedCall);

    if (result.isFailure()) return result;

    const receipt = result.value;

    const transaction = this.factory.createDataTransaction({
      id: receipt.id,
      request: signedCall.request,
    });

    return success(transaction);
  }

  private async relayWithProfileManager<T extends ProtocolTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<CreateMomokaPublicationResult, BroadcastingError> {
    try {
      const { data } = await this.apolloClient.mutate<
        BroadcastOnMomokaData,
        BroadcastOnMomokaVariables
      >({
        mutation: BroadcastOnMomokaDocument,
        variables: {
          request: {
            id: signedCall.id,
            signature: signedCall.signature,
          },
        },
      });

      if (data.result.__typename === 'RelayError') {
        return handleRelayError(data.result);
      }

      return success(data.result);
    } catch (err) {
      assertError(err);
      this.logger.error(err, `It was not possible to relay the transaction for ${signedCall.id}`);
      return failure(new BroadcastingError(BroadcastingErrorReason.UNKNOWN, { cause: err }));
    }
  }
}
