import { TransactionState, useWaitUntilTransactionSettled } from '@lens-protocol/api-bindings';
import { TransactionError, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { failure, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useCreateProfileController } from './adapters/useCreateProfileController';

export type CreateProfileArgs = {
  handle: string;
};

export type CreateProfileOperation = Operation<
  void,
  DuplicatedHandleError | TransactionError,
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
 * @example
 * ```tsx
 * import { useCreateProfile } from '@lens-protocol/react-web';
 *
 * function CreateProfile() {
 *   const { execute, isPending } = useCreateProfile();
 *
 *   const createProfile = async (handle: string) => {
 *     const result = await execute({ handle });
 *
 *     if (result.isSuccess()) {
 *       console.log("Profile created!");
 *     } else {
 *       console.log("Error: ", result.error.message);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button
 *         disabled={isPending}
 *         onClick={() => {
 *           createProfile("my-new-profile");
 *         }}
 *       >
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
    }: CreateProfileArgs): PromiseResult<void, DuplicatedHandleError | TransactionError> => {
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
        if (e instanceof TransactionError) {
          return failure(e);
        }
        throw e;
      }
    },
  );
}

export { DuplicatedHandleError };
