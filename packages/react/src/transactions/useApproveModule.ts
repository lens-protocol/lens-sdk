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

import { Operation, useOperation } from '../helpers/operations';
import { useApproveModuleController } from './adapters/useApproveModuleController';

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

/**
 * `useApproveModule` is a hook that lets you approve a Lens module to access the authenticated wallet Erc20 for the purpose of paying a fee
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * @category Misc
 * @group Hooks
 *
 * @example Approve a collect module for the amount specified in the publication collect policy
 * ```tsx
 * import { useApproveModule, CollectPolicyType, CollectablePublication, TokenAllowanceLimit } from '@lens-protocol/react-web';
 *
 * function ApproveCollect({ publication }: { publication: CollectablePublication }) {
 *   const approveModule = useApproveModule();
 *
 *   const handleClick = async () => {
 *     if (publication.collectPolicy.type === CollectPolicyType.CHARGE) {
 *       const result = await approveModule({
 *         // The collect fee amount
 *         amount: publication.collectPolicy.amount,
 *
 *         // The collect module contract address
 *         spender: publication.collectPolicy.contractAddress,
 *
 *         // In this case we want to  approve the exact amount
 *         limit: TokenAllowanceLimit.EXACT,
 *       })
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleClick}>Approve collect module</button>
 *   );
 * }
 * ```
 */
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
