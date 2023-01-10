import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  BroadcastProtocolCallDocument,
  BroadcastProtocolCallMutation,
  BroadcastProtocolCallMutationVariables,
} from '@lens-protocol/api-bindings';
import {
  MetaTransaction,
  SignedProtocolCall,
  TransactionError,
  TransactionErrorReason,
  TransactionRequestModel,
} from '@lens-protocol/domain/entities';
import {
  IProtocolCallRelayer,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, ILogger, invariant, success } from '@lens-protocol/shared-kernel';

import { AsyncRelayReceipt, ITransactionFactory } from './ITransactionFactory';

export class ProtocolCallRelayer implements IProtocolCallRelayer<SupportedTransactionRequest> {
  constructor(
    private apolloClient: ApolloClient<NormalizedCacheObject>,
    private factory: ITransactionFactory<SupportedTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relayProtocolCall<T extends SupportedTransactionRequest>(
    signedCall: SignedProtocolCall<T>,
  ): Promise<MetaTransaction<T>> {
    return this.factory.createMetaTransaction({
      chainType: ChainType.POLYGON,
      signedCall,
      asyncRelayReceipt: this.broadcast(signedCall),
    });
  }

  private async broadcast<T extends TransactionRequestModel>(
    signedCall: SignedProtocolCall<T>,
  ): AsyncRelayReceipt {
    try {
      const { data } = await this.apolloClient.mutate<
        BroadcastProtocolCallMutation,
        BroadcastProtocolCallMutationVariables
      >({
        mutation: BroadcastProtocolCallDocument,
        variables: {
          request: {
            id: signedCall.id,
            signature: signedCall.signature,
          },
        },
      });

      invariant(data, `Cannot relay transaction: ${signedCall.id}`);

      if (data.result.__typename === 'RelayError') {
        return failure(new TransactionError(TransactionErrorReason.REJECTED));
      }

      return success({
        indexingId: data.result.txId,
        txHash: data.result.txHash,
      });
    } catch (err) {
      this.logger.error(err, `It was not possible to relay the transaction for ${signedCall.id}`);
      return failure(new TransactionError(TransactionErrorReason.CANNOT_EXECUTE));
    }
  }
}
