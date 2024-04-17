import {
  Profile,
  ProfileRequest,
  UnspecifiedError,
  useProfile as useProfileHook,
} from '@lens-protocol/api-bindings';
import { invariant, OneOf } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { SuspenseEnabled, SuspenseReadResult } from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useProfile} hook arguments
 */
export type UseProfileArgs<TSuspense extends boolean = never> = OneOf<ProfileRequest> &
  SuspenseEnabled<TSuspense>;

/**
 * `useProfile` is a React hook that allows you to fetch a profile from the Lens API.
 *
 * @example
 * ```ts
 * const { data, error, loading } = useProfile({ forProfileId: '0x04' });
 * ```
 *
 * ## Basic Usage
 *
 * Get Profile by Handle:
 *
 * ```ts
 * const { data, error, loading } = useProfile({
 *   forHandle: 'lens/stani',
 * });
 * ```
 *
 * Get Profile by Id:
 *
 * ```ts
 * const { data, error, loading } = useProfile({
 *   forProfileId: '0x04',
 * });
 * ```
 *
 * ## Suspense Enabled
 *
 * You can enable suspense mode to suspend the component until the session data is available.
 *
 * ```ts
 * const { data } = useProfile({
 *   forHandle: 'lens/stani'
 * });
 *
 * console.log(data.id);
 * ```
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfileArgs}
 */
export function useProfile(args: UseProfileArgs<true>): SuspenseReadResult<Profile>;
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs<never>): ReadResult<Profile, NotFoundError | UnspecifiedError>;
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs<boolean>):
  | ReadResult<Profile, NotFoundError | UnspecifiedError>
  | SuspenseReadResult<Profile> {
  invariant(
    forProfileId === undefined || forHandle === undefined,
    "Only one of 'forProfileId' or 'forHandle' should be provided to 'useProfile' hook",
  );

  const { data, error, loading } = useReadResult(
    useProfileHook(
      useLensApolloClient({
        variables: useFragmentVariables({
          request: {
            ...(forHandle && { forHandle }),
            ...(forProfileId && { forProfileId }),
          },
        }),
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      }),
    ),
  );

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(
        forProfileId
          ? `Profile with id: ${forProfileId}`
          : `Profile with handle: ${forHandle ? forHandle : ''}`,
      ),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
