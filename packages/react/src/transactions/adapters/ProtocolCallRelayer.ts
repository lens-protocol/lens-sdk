import {
  BroadcastProtocolCallDocument,
  BroadcastProtocolCallData,
  BroadcastProtocolCallVariables,
  LensApolloClient,
  RelayErrorReasons,
} from '@lens-protocol/api-bindings';
import {
  MetaTransaction,
  ISignedProtocolCall,
  TransactionRequestModel,
} from '@lens-protocol/domain/entities';
import {
  IProtocolCallRelayer,
  BroadcastingError,
  BroadcastingErrorReason,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, ILogger, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from './ITransactionFactory';
import { RelayReceipt } from './RelayReceipt';

export class ProtocolCallRelayer implements IProtocolCallRelayer<SupportedTransactionRequest> {
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<SupportedTransactionRequest>,
    private logger: ILogger,
  ) {}

  async relayProtocolCall<T extends SupportedTransactionRequest>(
    signedCall: ISignedProtocolCall<T>,
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
    signedCall: ISignedProtocolCall<T>,
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
        switch (data.result.reason) {
          case RelayErrorReasons.Rejected:
            return failure(new BroadcastingError(BroadcastingErrorReason.REJECTED));
          default:
            return failure(new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED));
        }
      }

      return success({
        indexingId: data.result.txId,
        txHash: data.result.txHash,
      });
    } catch (err) {
      this.logger.error(err, `It was not possible to relay the transaction for ${signedCall.id}`);
      return failure(new BroadcastingError(BroadcastingErrorReason.UNSPECIFIED));
    }
  }
}
