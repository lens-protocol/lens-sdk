import { useSharedDependencies } from '../shared';
import { useRecentTransactionsVar } from './adapters/TransactionQueuePresenter';

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
