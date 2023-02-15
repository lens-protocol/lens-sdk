import { TransactionState, useWaitUntilTransactionSettled } from '@lens-protocol/api-bindings';
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

import { useApproveModuleController } from './adapters/useApproveModuleController';
import { Operation, useOperation } from '../helpers';

export type ApproveModuleArgs = {
  amount: Amount<Erc20>;
  limit: TokenAllowanceLimit;
  spender: EthereumAddress;
};

export { TokenAllowanceLimit };

export type ApproveModuleOperation = Operation<
  void,
  InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [ApproveModuleArgs]
>;

export function useApproveModule(): ApproveModuleOperation {
  const setAllowance = useApproveModuleController();

  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return useOperation(async ({ amount, limit, spender }: ApproveModuleArgs) => {
    const result = await setAllowance({
      amount,
      kind: TransactionKind.APPROVE_MODULE,
      limit,
      spender,
    });

    if (result.isSuccess()) {
      await waitUntilTransactionIsSettled(
        (transaction): transaction is TransactionState<TokenAllowanceRequest> =>
          transaction.request.kind === TransactionKind.APPROVE_MODULE &&
          transaction.request.spender === spender &&
          transaction.request.amount.asset === amount.asset,
      );
    }

    return result;
  });
}
