import { useSharedDependencies } from '../shared';

export function useClearRecentTransactions() {
  const { transactionQueue } = useSharedDependencies();

  return () => {
    transactionQueue.clearRecent();
  };
}
