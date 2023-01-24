import { SupportedTransactionRequest } from '@lens-protocol/domain/dist/use-cases/transactions';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/dist/use-cases/wallets';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Amount, Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import {
  TransactionState,
  useHasPendingTransaction,
  useHasSettledTransaction,
} from './adapters/TransactionQueuePresenter';
import { useApproveModuleController } from './adapters/useApproveModuleController';

export type UseApproveModuleArgs = {
  amount: Amount<Erc20>;
  spender: EthereumAddress;
};

export function useApproveModule({ amount, spender }: UseApproveModuleArgs) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<
    | InsufficientGasError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | null
  >(null);
  const setAllowance = useApproveModuleController();

  function isApproveTransaction(
    transaction: TransactionState<SupportedTransactionRequest>,
  ): transaction is TransactionState<TokenAllowanceRequest> {
    return (
      transaction.request.kind === TransactionKind.APPROVE_MODULE &&
      transaction.request.spender === spender &&
      transaction.request.amount.asset === amount.asset
    );
  }

  const hasPendingTx = useHasPendingTransaction(isApproveTransaction);
  const isApproved = useHasSettledTransaction(isApproveTransaction);

  return {
    setAllowance: async () => {
      setIsPending(true);
      setError(null);
      const result = await setAllowance({
        amount,
        spender,
        kind: TransactionKind.APPROVE_MODULE,
        limit: TokenAllowanceLimit.EXACT,
      });
      if (result.isFailure()) {
        setError(result.error);
      }
      setIsPending(false);
    },
    error,
    isPending: isPending || hasPendingTx,
    isApproved,
  };
}
