import {
  LensApolloClient,
  BroadcastOffChainData,
  BroadcastOffChainVariables,
  BroadcastOffChainDocument,
} from '@lens-protocol/api-bindings';
import { DataTransaction } from '@lens-protocol/domain/entities';
import { IOffChainRelayer } from '@lens-protocol/domain/src/use-cases/transactions/SubsidizeOffChain';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
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
import { handleRelayError, OffChainBroadcastReceipt } from './relayer';

export class OffChainRelayer implements IOffChainRelayer<CreatePostRequest> {
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<ProtocolTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relayProtocolCall<T extends ProtocolTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<DataTransaction<T>, BroadcastingError> {
    const result = await this.broadcast(signedCall);

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;

    const transaction = this.factory.createDataTransaction({
      id: receipt.id,
      request: signedCall.request,
    });

    return success(transaction);
  }

  private async broadcast<T extends ProtocolTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<OffChainBroadcastReceipt, BroadcastingError> {
    try {
      const { data } = await this.apolloClient.mutate<
        BroadcastOffChainData,
        BroadcastOffChainVariables
      >({
        mutation: BroadcastOffChainDocument,
        variables: {
          request: {
            id: signedCall.id,
            signature: signedCall.signature,
          },
        },
      });

      if (data.result.__typename === 'RelayError') {
        return handleRelayError(data.result, signedCall.fallback);
      }

      return success({
        id: data.result.id,
      });
    } catch (err) {
      this.logger.error(err, `It was not possible to relay the transaction for ${signedCall.id}`);
      assertError(err);
      return failure(new BroadcastingError(err.message));
    }
  }
}
