import { useRecentTransactionsVar } from '@lens-protocol/api-bindings';

import { useSharedDependencies } from '../shared';

export { TxStatus } from '@lens-protocol/api-bindings';

export type {
  TransactionState,
  PendingTransactionState,
  BroadcastedTransactionState,
} from '@lens-protocol/api-bindings';

/**
 * `useRecentTransactions` is a hook that lets you access the recent pending transactions
 *
 * You can use this hook to show insights about the pending transactions in your app.
 *
 * You can also use this hook to clear the recent transactions queue.
 *
 * @category Misc
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { useRecentTransactions } from '@lens-protocol/react-web';
 *
 * function RecentTransactions() {
 *   const { transactions, clearCompleted } = useRecentTransactions();
 *
 *   return (
 *     <div>
 *       <h2>Recent transactions</h2>
 *       <ul>
 *         {transactions.map((transaction) => (
 *           <li key={transaction.id}>
 *             <p>Transaction ID: {transaction.id}</p>
 *             <p>Status: {transaction.status}</p>
 *           </li>
 *         ))}
 *       </ul>
 *       <button onClick={clearCompleted}>Clear completed</button>
 *     </div>
 *   );
 * }
 * ```
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
