import {
  Profile,
  ProfileRequest,
  UnspecifiedError,
  useProfileLazyQuery,
} from '@lens-protocol/api-bindings';
import { failure, OneOf, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useLazyFragmentVariables } from '../helpers/variables';

/**
 * {@link useLazyProfile} callback hook arguments
 */
export type FetchProfileArgs = OneOf<ProfileRequest>;

/**
 * `useLazyProfile` is a lazy version of {@link useProfile} React Hook.
 *
 * This hook will not fetch the profile until the returned function is called.
 *
 * This hook is intended to enable more complex use cases, the vast majority of
 * use cases should use {@link useProfile} instead.
 *
 * @example
 * ```ts
 * const { called, data, error, loading, execute } = useLazyProfile();
 * ```
 *
 * @experimental This hook is experimental and may change in the future.
 *
 * ```ts
 * const { called, data, error, loading, execute } = useLazyProfile();
 *
 * const callback = async () => {
 *   const result = await execute({ forProfileId: profileId });
 *
 *   if (result.isFailure()) {
 *     toast.error(result.error.message);
 *     return;
 *   }
 *
 *   const profile = result.value;
 *
 *   // do something with profile
 * }
 * ```
 *
 * @category Profiles
 * @group Hooks
 */
export function useLazyProfile(): UseDeferredTask<
  Profile,
  NotFoundError | UnspecifiedError,
  FetchProfileArgs
> {
  const [fetch] = useProfileLazyQuery(
    useLensApolloClient({
      fetchPolicy: 'cache-and-network',
    }),
  );
  const fill = useLazyFragmentVariables();

  return useDeferredTask(async (args): PromiseResult<Profile, NotFoundError | UnspecifiedError> => {
    const { data, error } = await fetch({ variables: fill({ request: args }) });

    if (error) {
      return failure(new UnspecifiedError(error));
    }

    if (!data?.result) {
      return failure(
        new NotFoundError(`profile for: ${String(args.forProfileId ?? args.forHandle)}`),
      );
    }

    return success(data.result);
  });
}
