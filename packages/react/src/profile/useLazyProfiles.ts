import {
  Profile,
  ProfilesRequest,
  UnspecifiedError,
  useProfilesLazyQuery,
} from '@lens-protocol/api-bindings';
import { failure, invariant, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs } from '../helpers/reads';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useLazyFragmentVariables } from '../helpers/variables';

/**
 * {@link useLazyProfiles} callback hook arguments
 */
export type FetchProfilesArgs = PaginatedArgs<ProfilesRequest>;

/**
 * `useLazyProfiles` is a lazy version of {@link useProfiles} React Hook.
 *
 * This version doesn't support pagination!
 *
 * This hook will not fetch profiles until the returned function is called.
 *
 * @experimental This hook is experimental and may change in the future.
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyProfiles();
 *
 * const callback = async () => {
 *   const result = await execute({
 *     where: {
 *       profileIds: ['0x01', '0x02'],
 *     },
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
 * @category Profiles
 * @group Hooks
 */
export function useLazyProfiles(): UseDeferredTask<Profile[], UnspecifiedError, FetchProfilesArgs> {
  const [fetch] = useProfilesLazyQuery(useLensApolloClient({ fetchPolicy: 'no-cache' }));
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
