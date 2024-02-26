import {
  Profile,
  ProfilesManagedRequest,
  UnspecifiedError,
  useProfilesManagedLazyQuery,
} from '@lens-protocol/api-bindings';
import { failure, invariant, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs } from '../helpers/reads';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useLazyFragmentVariables } from '../helpers/variables';

/**
 * {@link useLazyProfilesManaged} callback hook arguments
 */
export type ProfilesManagedArgs = PaginatedArgs<ProfilesManagedRequest>;

/**
 * `useLazyProfilesManaged` is a lazy version of {@link useProfilesManaged} React Hook.
 *
 * This version doesn't support pagination!
 *
 * This hook will not fetch profiles until the returned function is called.
 *
 * @experimental This hook is experimental and may change in the future.
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyProfilesManaged();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     for: '0x1234567890123456789012345678901234567890',
 *   });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *     return;
 *   }
 *
 *   const profiles = result.value;
 *
 *   // do something with the profiles
 * }
 * ```
 *
 * @category Wallet
 * @group Hooks
 */
export function useLazyProfilesManaged(): UseDeferredTask<
  Profile[],
  UnspecifiedError,
  ProfilesManagedArgs
> {
  const [fetch] = useProfilesManagedLazyQuery(useLensApolloClient({ fetchPolicy: 'no-cache' }));
  const fill = useLazyFragmentVariables();

  return useDeferredTask(async (args): PromiseResult<Profile[], UnspecifiedError> => {
    const { data, error } = await fetch({ variables: fill(args) });

    if (error) {
      return failure(new UnspecifiedError(error));
    }

    invariant(data, 'Data must be defined');

    return success(data.result.items);
  });
}
