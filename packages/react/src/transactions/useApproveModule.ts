import { AnyPublication, Profile, resolveTokenAllowanceRequest } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { TokenAllowanceLimit } from '@lens-protocol/domain/use-cases/transactions';

import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useTokenAllowanceController } from './adapters/useTokenAllowanceController';

export { TokenAllowanceLimit };

/**
 * Arguments for the {@link useApproveModule} hook.
 */
export type UseApproveModuleArgs = {
  /**
   * The type of pre-approval to perform.
   *
   * @defaultValue TokenAllowanceLimit.EXACT
   */
  limit: TokenAllowanceLimit;
};

/**
 * Arguments for the {@link useApproveModule} hook callback.
 */
export type ApproveModuleArgs = {
  /**
   * The Profile or Publication requiring the pre-approval.
   */
  on: AnyPublication | Profile;
};

/**
 * `useApproveModule` is a React Hook that allows to perform an ERC20 pre-approval
 * for any Profile Follow modules requiring a fee, or any Publication Collect
 * modules with a fee.
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useApproveModule();
 * ```
 *
 * A pre-approval does not touch the user's ERC20 but allows the module to withdraw
 * the authorized amount at a later time with an additional transaction.
 *
 * In the case of Collect Open Action modules the additional transaction is the one
 * performed via {@link useOpenAction} hook.
 *
 * In the case of Profile Follow modules the additional transaction is the one
 * performed via {@link useFollow} hook.
 *
 * In both case the additional transaction can be user's signed or can be delegated to
 * a Profile Manager (see {@link useUpdateProfileManagers} hook).
 *
 *
 * ## Pre-approve a Profile Follow module
 * ```ts
 * const { execute, error, loading } = useApproveModule();
 *
 * const approve = async () => {
 *   await execute({
 * ```
 * TBD
 *
 * ## Pre-approve a Publication Collect module
 *
 * TBD
 *
 * ## Failure scenarios
 *
 * TBD
 *
 * ## Infinite approval
 *
 * TBD
 *
 * @category Modules
 * @group Hooks
 */
export function useApproveModule(
  args: UseApproveModuleArgs,
): UseDeferredTask<
  void,
  | InsufficientGasError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError,
  ApproveModuleArgs
> {
  const increaseAllowance = useTokenAllowanceController();

  return useDeferredTask(async ({ on }) => {
    const request = resolveTokenAllowanceRequest(on, args.limit);

    return increaseAllowance(request);
  });
}
