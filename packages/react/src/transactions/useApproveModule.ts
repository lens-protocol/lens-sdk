import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/wallets';
import { Amount, Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import {
  TransactionState,
  useWaitUntilTransactionSettled,
} from './adapters/TransactionQueuePresenter';
import { useApproveModuleController } from './adapters/useApproveModuleController';

export type ApproveModuleArgs = {
  amount: Amount<Erc20>;
  limit: TokenAllowanceLimit;
  spender: EthereumAddress;
};

export function useApproveModule() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<
    | InsufficientGasError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | null
  >(null);
  const setAllowance = useApproveModuleController();

  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return {
    approve: async ({ amount, limit, spender }: ApproveModuleArgs) => {
      setIsPending(true);
      setError(null);

      try {
        const result = await setAllowance({
          amount,
          kind: TransactionKind.APPROVE_MODULE,
          limit,
          spender,
        });

        if (result.isFailure()) {
          setError(result.error);
          return;
        }

        await waitUntilTransactionIsSettled(
          (transaction): transaction is TransactionState<TokenAllowanceRequest> =>
            transaction.request.kind === TransactionKind.APPROVE_MODULE &&
            transaction.request.spender === spender &&
            transaction.request.amount.asset === amount.asset,
        );
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
