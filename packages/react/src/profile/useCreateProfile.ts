import { TransactionState, useWaitUntilTransactionSettled } from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useCreateProfileController } from './adapters/useCreateProfileController';

export type CreateProfileArgs = {
  handle: string;
};

export { DuplicatedHandleError };

export type CreateProfileOperation = Operation<
  void,
  DuplicatedHandleError | BroadcastingError,
  [CreateProfileArgs]
>;

/**
 * `useCreateProfile` is a hook that lets you create a new profile
 *
 * The hook `execute` function resolves with a {@link Result} when the corresponding transaction is settled.
 * You can use the {@link Success.isSuccess | `Result.isSuccess`} (or {@link Failure.isFailure | `Result.isFailure`}) method
 * to determine the outcome of the operation.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example Simple usage
 * ```tsx
 * import { useCreateProfile } from '@lens-protocol/react-web';
 *
 * function CreateProfile() {
 *   const { error, execute, isPending } = useCreateProfile();
 *
 *   const onClick = async () => {
 *     const handle = window.prompt("Enter your handle");
 *
 *     const result = await execute({ handle });
 *
 *     if (result.isSuccess()) {
 *       console.log("Profile created!");
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       { error && <p>{error.message}</p>}
 *       <button disabled={isPending} onClick={onClick}>
 *         Create profile
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example Programmatic error handling
 * ```tsx
 * import { useCreateProfile, DuplicatedHandleError } from '@lens-protocol/react-web';
 *
 * function CreateProfile() {
 *   const { execute, isPending } = useCreateProfile();
 *
 *   const onClick = async () => {
 *     const handle = window.prompt("Enter your handle");
 *
 *     const result = await execute({ handle });
 *
 *     if (result.isSuccess()) {
 *       console.log("Profile created!");
 *       return;
 *     }
 *
 *     switch (result.error.constructor) {
 *       case DuplicatedHandleError:
 *         console.log("Handle already taken");
 *
 *       default:
 *         console.log(`Could not create profile due to: ${result.error.message}`);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button disabled={isPending} onClick={onClick}>
 *         Create profile
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCreateProfile(): CreateProfileOperation {
  const createProfile = useCreateProfileController();

  const waitUntilTransactionIsSettled = useWaitUntilTransactionSettled();

  return useOperation(
    async ({
      handle,
    }: CreateProfileArgs): PromiseResult<void, DuplicatedHandleError | BroadcastingError> => {
      try {
        const result = await createProfile({
          handle,
          kind: TransactionKind.CREATE_PROFILE,
        });

        if (result.isSuccess()) {
          await waitUntilTransactionIsSettled(
            (transaction): transaction is TransactionState<CreateProfileRequest> =>
              transaction.request.kind === TransactionKind.CREATE_PROFILE &&
              transaction.request.handle === handle,
          );
        }

        return result;
      } catch (e) {
        if (e instanceof BroadcastingError) {
          return failure(e);
        }
        throw e;
      }
    },
  );
}
