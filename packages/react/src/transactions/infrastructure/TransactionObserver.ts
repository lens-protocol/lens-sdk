import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  HasTxHashBeenIndexedDocument,
  HasTxHashBeenIndexedQuery,
  HasTxHashBeenIndexedQueryVariables,
  ProxyActionStatusDocument,
  ProxyActionStatusQuery,
  ProxyActionStatusQueryVariables,
  ProxyActionStatusTypes,
  TransactionErrorReasons,
  TransactionIndexedResult,
  isProxyActionError,
  isTransactionError,
} from '@lens-protocol/api';
import {
  ProxyActionStatus,
  TransactionError,
  TransactionErrorReason,
} from '@lens-protocol/domain/entities';
import { ChainType, failure, PromiseResult, Result, success } from '@lens-protocol/shared-kernel';

import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import { IndexingEvent, ITransactionObserver, ProxyActionStatusEvent } from './TransactionFactory';

const ONE_SECOND = 1000; // ms

export type Timings = {
  pollingPeriod: number; // ms
  maxMiningWaitTime: number; // ms
  maxIndexingWaitTime: number; // ms
};

function delay(waitInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
}

function indexingEvent({
  indexed,
  txHash,
}: Pick<TransactionIndexedResult, 'indexed' | 'txHash'>): IndexingEvent {
  return {
    indexed,
    txHash,
  };
}

function resolveTransactionErrorReason(reason: TransactionErrorReasons) {
  switch (reason) {
    case TransactionErrorReasons.Reverted:
      return TransactionErrorReason.REVERTED;
    default:
      return TransactionErrorReason.UNKNOWN;
  }
}

export class TransactionObserver implements ITransactionObserver {
  constructor(
    private readonly providerFactory: IProviderFactory,
    private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    private readonly timings: Timings,
  ) {}

  async waitForExecuted(
    txHash: string,
    chainType: ChainType,
  ): PromiseResult<void, TransactionError> {
    const provider = await this.providerFactory.createProvider({ chainType });
    const startedAt = Date.now();

    while (Date.now() - startedAt <= this.timings.maxMiningWaitTime) {
      const txResponse = await provider.getTransaction(txHash);

      if (txResponse === null) {
        await delay(ONE_SECOND);
        continue;
      }
      try {
        await Promise.race([
          txResponse.wait(1),

          delay(this.timings.maxMiningWaitTime).then(() => {
            throw new TransactionError(TransactionErrorReason.MINING_TIMEOUT, txHash);
          }),
        ]);
        return success();
      } catch (e) {
        if (e instanceof TransactionError) {
          return failure(e);
        }
        throw e;
      }
    }
    return failure(new TransactionError(TransactionErrorReason.MINING_TIMEOUT, txHash));
  }

  async waitForNextIndexingEvent(
    indexingId: string,
  ): PromiseResult<IndexingEvent, TransactionError> {
    const startedAt = Date.now();
    const observable = this.apolloClient.watchQuery<
      HasTxHashBeenIndexedQuery,
      HasTxHashBeenIndexedQueryVariables
    >({
      query: HasTxHashBeenIndexedDocument,
      variables: {
        request: { txId: indexingId },
      },
    });

    const firstResponse = await observable.result();
    if (isTransactionError(firstResponse.data.result)) {
      return failure(
        new TransactionError(resolveTransactionErrorReason(firstResponse.data.result.reason)),
      );
    }

    if (firstResponse.data.result.indexed) {
      return success(indexingEvent(firstResponse.data.result));
    }
    const initialTxHash = firstResponse.data.result.txHash;

    observable.startPolling(this.timings.pollingPeriod);

    return new Promise<Result<IndexingEvent, TransactionError>>((resolve, reject) => {
      const subscription = observable.subscribe({
        next: async (nextResponse) => {
          if (nextResponse.error) {
            subscription.unsubscribe();
            reject(nextResponse.error);
            return;
          }

          switch (nextResponse.data.result.__typename) {
            case 'TransactionIndexedResult':
              if (
                initialTxHash !== nextResponse.data.result.txHash ||
                nextResponse.data.result.indexed
              ) {
                subscription.unsubscribe();
                resolve(success(indexingEvent(nextResponse.data.result)));
                return;
              }
              break;

            case 'TransactionError':
              subscription.unsubscribe();
              resolve(
                failure(
                  new TransactionError(
                    resolveTransactionErrorReason(nextResponse.data.result.reason),
                    initialTxHash,
                  ),
                ),
              );
          }

          if (Date.now() - startedAt > this.timings.maxIndexingWaitTime) {
            subscription.unsubscribe();

            resolve(
              failure(new TransactionError(TransactionErrorReason.INDEXING_TIMEOUT, initialTxHash)),
            );
          }
        },
        error: reject,
      });
    });
  }

  async waitForProxyTransactionStatus(
    proxyId: string,
  ): PromiseResult<ProxyActionStatusEvent, TransactionError> {
    const startedAt = Date.now();
    const observable = this.apolloClient.watchQuery<
      ProxyActionStatusQuery,
      ProxyActionStatusQueryVariables
    >({
      query: ProxyActionStatusDocument,
      variables: { proxyActionId: proxyId },
    });

    const firstResponse = await observable.result();

    if (isProxyActionError(firstResponse.data.result)) {
      return failure(new TransactionError(TransactionErrorReason.UNKNOWN));
    }

    if (
      firstResponse.data.result.__typename === 'ProxyActionStatusResult' &&
      firstResponse.data.result.status === ProxyActionStatusTypes.Complete
    ) {
      return success({
        txHash: firstResponse.data.result.txHash,
        status: ProxyActionStatus.COMPLETE,
        txId: firstResponse.data.result.txId,
      });
    }

    observable.startPolling(this.timings.pollingPeriod);

    return new Promise<Result<ProxyActionStatusEvent, TransactionError>>((resolve, reject) => {
      const subscription = observable.subscribe({
        next: async (nextResponse) => {
          if (nextResponse.error) {
            subscription.unsubscribe();
            reject(nextResponse.error);
            return;
          }

          switch (nextResponse.data.result.__typename) {
            case 'ProxyActionStatusResult':
              if (nextResponse.data.result.status === ProxyActionStatusTypes.Complete) {
                subscription.unsubscribe();
                resolve(
                  success({
                    txHash: nextResponse.data.result.txHash,
                    status: ProxyActionStatus.COMPLETE,
                    txId: nextResponse.data.result.txId,
                  }),
                );
                return;
              }

              break;

            case 'ProxyActionError':
              subscription.unsubscribe();
              resolve(
                failure(
                  new TransactionError(
                    resolveTransactionErrorReason(TransactionErrorReasons.Reverted),
                  ),
                ),
              );
          }

          // handle timeout as the last possible case, otherwise can fail with timeout on Complete tx
          if (Date.now() - startedAt > this.timings.maxIndexingWaitTime) {
            subscription.unsubscribe();

            resolve(failure(new TransactionError(TransactionErrorReason.INDEXING_TIMEOUT)));
          }
        },
        error: reject,
      });
    });
  }
}
