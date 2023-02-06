import { uniqBy } from 'lodash';
import { useSharedDependencies } from '../shared';
import { TxStatus, useRecentTransactionsVar } from './adapters/TransactionQueuePresenter';

export function useRecentTransactions() {
  const { transactionQueue } = useSharedDependencies();

  const transactions = useRecentTransactionsVar();

  return {
    clearCompleted() {
      transactionQueue.clearRecent();
    },
    transactions: uniqBy(transactions, (t) => JSON.stringify(t.request)).map((transaction) => ({
      ...transaction,
      completed: transaction.status === TxStatus.SETTLED,
    })),
  };
}
