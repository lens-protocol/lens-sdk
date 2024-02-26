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
 * ## Pre-approve a profile follow module
 *
 * Assuming you integrated the {@link useFollow} hook in your application, you might
 * find that, in case of paid follows the result might fail with an {@link InsufficientAllowanceError}.
 *
 * ```ts
 * const { execute: follow } = useFollow();
 *
 * const followProfile = async (profile: Profile) => {
 *   const result = await execute({ profile });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientAllowanceError':
 *         // not enough allowance
 *         // pre-approve the module
 *         break;
 *
 *       // others
 *     }
 *   }
 * };
 * ```
 *
 * You can use the `useApproveModule` hook to pre-approve the module and,
 * according to the desired UX, try again the follow operation.
 *
 *
 * ```ts
 * const { execute: approve } = useApproveModule();
 * const { execute: follow } = useFollow();
 *
 * const approveFollowModuleFor = async (profile: Profile) => {
 *   const result = await approve({ on: profile });
 *
 *   if (result.isFailure()) {
 *     console.log(result.error.message);
 *     return;
 *   }
 *
 *   // try again the follow operation
 *   return followProfile(profile);
 * };
 *
 * const followProfile = async (profile: Profile) => {
 *   const result = await follow({ profile });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientAllowanceError':
 *         return approveFollowModuleFor(profile);
 *
 *       // others
 *     }
 *   }
 *
 *   // ...
 * };
 * ```
 *
 * ## Pre-approve a publication collect module
 *
 * Similarly to the Profile Follow module, you can use the `useApproveModule` hook
 * to pre-approve a Publication Collect module (legacy or Open Action based).
 *
 * ```ts
 * const { execute: approve } = useApproveModule();
 * const { execute: collect } = useOpenAction({
 *   action: {
 *     kind: OpenActionKind.COLLECT,
 *   }
 * });
 *
 * const approveCollectModuleFor = async (publication: AnyPublication) => {
 *   const result = await approve({ on: publication });
 *
 *   if (result.isFailure()) {
 *     console.log(result.error.message);
 *     return;
 *   }
 *
 *   // try again the collect operation
 *   return collectPublication(publication);
 * };
 *
 * const collectPublication = async (publication: AnyPublication) => {
 *   const result = collect({ publication });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientAllowanceError':
 *         return approveCollectModuleFor(publication);
 *
 *       // others
 *     }
 *   }
 *
 *   // ...
 * };
 * ```
 *
 * ## Failure scenarios
 *
 * Like many other SDK hooks there are some failure scenarios that you might want to handle.
 *
 * ```ts
 * const { execute, error, loading } = useApproveModule();
 *
 * const approve = async (item: AnyPublication | Profile) => {
 *   const result = await execute({ on: publication });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientGasError':
 *         console.log(`The user's wallet does not have enough MATIC to pay for the transaction`);
 *         break;
 *
 *       case 'PendingSigningRequestError':
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case 'TransactionError':
 *         console.log('There was an processing the transaction', result.error.message);
 *         break;
 *
 *       case 'WalletConnectionError':
 *         console.log('There was an error connecting to your wallet', result.error.message);
 *         break;
 *
 *       case 'UserRejectedError':
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 *
 *   // ...
 * };
 * ```
 *
 * ## Infinite approval
 *
 * By default the `useApproveModule` hook will pre-approve the exact amount required.
 *
 * You can still pre-approve an infinite amount by passing the `limit` argument:
 *
 * ```ts
 * const { execute, error, loading } = useApproveModule({
 *   limit: TokenAllowanceLimit.INFINITE
 * });
 * ```
 *
 * @category Modules
 * @group Hooks
 */
export function useApproveModule(
  args: UseApproveModuleArgs = { limit: TokenAllowanceLimit.EXACT },
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
