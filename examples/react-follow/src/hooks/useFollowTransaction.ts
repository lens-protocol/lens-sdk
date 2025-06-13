import { useState, useEffect } from 'react';
import { useFollow, useUnfollow } from '@lens-protocol/react';
import { handleOperationWith } from '@lens-protocol/react/viem';
import { useWalletClient } from 'wagmi';

interface TransactionState {
  txHash?: string;
  message?: string;
  error?: string;
  loading?: boolean;
}

export function useFollowTransaction() {
  const { data: wallet } = useWalletClient();
  const { execute: follow } = useFollow({ handler: handleOperationWith(wallet) });
  const { execute: unfollow } = useUnfollow({ handler: handleOperationWith(wallet) });

  const [transactionResult, setTransactionResult] = useState<TransactionState>({});
  const [pendingResult, setPendingResult] = useState<Promise<any> | null>(null);
  const [pendingAction, setPendingAction] = useState<'follow' | 'unfollow' | null>(null);

  // Effect to handle transaction result resolution
  useEffect(() => {
    if (pendingResult) {
      pendingResult
        .then(result => {
          if (result.isOk()) {
            setTransactionResult({
              txHash: result.value,
              message: `Successfully ${pendingAction}ed account!`,
              loading: false
            });
          } else {
            setTransactionResult({
              error: result.error.message,
              loading: false
            });
          }
        })
        .catch(error => {
          setTransactionResult({
            error: `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            loading: false
          });
        })
        .finally(() => {
          setPendingResult(null);
          setPendingAction(null);
        });
    }
  }, [pendingResult, pendingAction]);

  const handleFollow = async (accountAddress: string) => {
    try {
      setPendingAction('follow');
      setTransactionResult({ loading: true, });
      const result = await follow({ account: accountAddress });
      setPendingResult(Promise.resolve(result));
    } catch (error) {
      setTransactionResult({
        error: `Failed to follow: ${error instanceof Error ? error.message : 'Unknown error'}`,
        loading: false
      });
    }
  };

  const handleUnfollow = async (accountAddress: string) => {
    try {
      setPendingAction('unfollow');
      setTransactionResult({ loading: true, });
      const result = await unfollow({ account: accountAddress });
      setPendingResult(Promise.resolve(result));
    } catch (error) {
      setTransactionResult({
        error: `Failed to unfollow: ${error instanceof Error ? error.message : 'Unknown error'}`,
        loading: false
      });
    }
  };

  return {
    transactionResult,
    handleFollow,
    handleUnfollow
  };
} 
