import {
  BroadcastOnChainData,
  BroadcastOnChainDocument,
  BroadcastOnChainVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { MetaTransaction } from '@lens-protocol/domain/entities';
import {
  IOnChainRelayer,
  BroadcastingError,
  ProtocolTransactionRequest,
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
import { handleRelayError, OnChainBroadcastReceipt } from './relayer';

export class OnChainRelayer implements IOnChainRelayer<ProtocolTransactionRequest> {
  constructor(
    private apolloClient: SafeApolloClient,
    private factory: ITransactionFactory<ProtocolTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relayProtocolCall<T extends ProtocolTransactionRequest>(
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

  private async broadcast<T extends ProtocolTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<OnChainBroadcastReceipt, BroadcastingError> {
    try {
      const { data } = await this.apolloClient.mutate<
        BroadcastOnChainData,
        BroadcastOnChainVariables
      >({
        mutation: BroadcastOnChainDocument,
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
