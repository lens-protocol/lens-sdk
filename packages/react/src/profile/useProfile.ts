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

/**
 * {@link useProfile} hook arguments
 */
export type UseProfileArgs = OneOf<ProfileRequest>;

/**
 * `useProfile` is a React hook that allows you to fetch a profile from the Lens API.
 *
 * @example
 * ```ts
 * const { data, error, loading } = useProfile({ forProfileId: '0x04' });
 * ```
 *
 * Get a profile by handle:
 * ```ts
 * const { data, error, loading } = useProfile({
 *   forHandle: 'lens/stani',
 * });
 * ```
 *
 * Get a profile by Id:
 * ```ts
 * const { data, error, loading } = useProfile({
 *   forProfileId: '0x04',
 * });
 * ```
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfileArgs}
 */
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs): ReadResult<Profile, NotFoundError | UnspecifiedError> {
  invariant(
    forProfileId === undefined || forHandle === undefined,
    "Only one of 'forProfileId' or 'forHandle' should be provided to 'useProfile' hook",
  );

  const { data, error, loading } = useReadResult(
    useProfileHook(
      useLensApolloClient({
        variables: {
          request: {
            ...(forHandle && { forHandle }),
            ...(forProfileId && { forProfileId }),
          },
        },
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
