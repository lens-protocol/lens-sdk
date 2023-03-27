import { useRecentTransactionsVar } from '@lens-protocol/api-bindings';

import { useSharedDependencies } from '../shared';

export { TxStatus } from '@lens-protocol/api-bindings';

export type {
  TransactionState,
  PendingTransactionState,
  BroadcastedTransactionState,
} from '@lens-protocol/api-bindings';

/**
 * @category Misc
 * @group Hooks
 */
export function useRecentTransactions() {
  const { transactionQueue } = useSharedDependencies();

  const transactions = useRecentTransactionsVar();

  return {
    clearCompleted() {
      transactionQueue.clearRecent();
    },
    transactions,
  };
}
