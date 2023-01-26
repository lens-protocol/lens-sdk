import { useSharedDependencies } from '../shared';
import { TxStatus, useRecentTransactionsVar } from './adapters/TransactionQueuePresenter';

export function useRecentTransactions() {
  const { transactionQueue } = useSharedDependencies();

  const transactions = useRecentTransactionsVar();

  return {
    clear() {
      transactionQueue.clearRecent();
    },
    transactions: transactions.filter((transaction) => transaction.status === TxStatus.SETTLED),
  };
}
