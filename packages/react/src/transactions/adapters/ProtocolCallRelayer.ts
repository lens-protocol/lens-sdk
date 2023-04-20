import {
  BroadcastProtocolCallDocument,
  BroadcastProtocolCallData,
  BroadcastProtocolCallVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { MetaTransaction, TransactionRequestModel } from '@lens-protocol/domain/entities';
import {
  IProtocolCallRelayer,
  BroadcastingError,
  SupportedTransactionRequest,
  ProtocolCallRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  assertError,
  ChainType,
  failure,
  ILogger,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

import { SignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { handleRelayError, RelayReceipt } from './relayer';

export class ProtocolCallRelayer implements IProtocolCallRelayer<ProtocolCallRequest> {
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<SupportedTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relayProtocolCall<T extends SupportedTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<MetaTransaction<T>, BroadcastingError> {
    const result = await this.broadcast(signedCall);

    if (result.isFailure()) return failure(result.error);

    const receipt = result.value;

    const transaction = this.factory.createMetaTransaction({
      chainType: ChainType.POLYGON,
      id: signedCall.id,
      request: signedCall.request,
      nonce: signedCall.nonce,
      indexingId: receipt.indexingId,
      txHash: receipt.txHash,
    });

    return success(transaction);
  }

  private async broadcast<T extends TransactionRequestModel>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<RelayReceipt, BroadcastingError> {
    try {
      const { data } = await this.apolloClient.mutate<
        BroadcastProtocolCallData,
        BroadcastProtocolCallVariables
      >({
        mutation: BroadcastProtocolCallDocument,
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
        indexingId: data.result.txId,
        txHash: data.result.txHash,
      });
    } catch (err) {
      this.logger.error(err, `It was not possible to relay the transaction for ${signedCall.id}`);
      assertError(err);
      return failure(new BroadcastingError(err.message));
    }
  }
}
