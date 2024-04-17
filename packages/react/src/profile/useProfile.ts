/* eslint-disable react-hooks/rules-of-hooks */
import { useSuspenseQuery } from '@apollo/client';
import {
  Profile,
  ProfileData,
  ProfileDocument,
  ProfileRequest,
  ProfileVariables,
  UnspecifiedError,
  useProfile as useProfileQuery,
} from '@lens-protocol/api-bindings';
import { invariant, OneOf } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult, useSuspenseReadResult } from '../helpers/reads';
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
export function useProfile(args: UseProfileArgs<true>): SuspenseReadResult<Profile, NotFoundError>;
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs<never>): ReadResult<Profile, NotFoundError | UnspecifiedError>;
export function useProfile({
  forHandle,
  forProfileId,
  suspense = false,
}: UseProfileArgs<boolean>):
  | ReadResult<Profile, NotFoundError | UnspecifiedError>
  | SuspenseReadResult<Profile, NotFoundError> {
  invariant(
    forProfileId === undefined || forHandle === undefined,
    "Only one of 'forProfileId' or 'forHandle' should be provided to 'useProfile' hook",
  );

  if (suspense) {
    const { data } = useSuspenseReadResult(
      useSuspenseQuery<ProfileData, ProfileVariables>(
        ProfileDocument,
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

    if (data === null) {
      return {
        data: undefined,
        error: new NotFoundError(
          forProfileId
            ? `Profile with id: ${forProfileId}`
            : `Profile with handle: ${forHandle ? forHandle : ''}`,
        ),
      };
    }

    return {
      data,
      error: undefined,
    };
  }

  const { data, error, loading } = useReadResult(
    useProfileQuery(
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
