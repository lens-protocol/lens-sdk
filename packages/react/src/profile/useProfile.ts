import {
  Profile,
  ProfileDocument,
  ProfileRequest,
  ProfileVariables,
  UnspecifiedError,
} from '@lens-protocol/api-bindings';
import { invariant, OneOf } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { SuspenseEnabled, SuspenseResultWithError, useSuspendableQuery } from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

function profileNotFound({ forProfileId, forHandle }: UseProfileArgs) {
  return new NotFoundError(
    forProfileId
      ? `Profile with id: ${forProfileId}`
      : `Profile with handle: ${forHandle ? forHandle : ''}`,
  );
}

export type { ProfileRequest };

/**
 * {@link useProfile} hook arguments
 */
export type UseProfileArgs = OneOf<ProfileRequest>;

/**
 * {@link useProfile} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseProfileArgs = SuspenseEnabled<UseProfileArgs>;

export type UseProfileResult =
  | ReadResult<Profile, NotFoundError | UnspecifiedError>
  | SuspenseResultWithError<Profile, NotFoundError>;

/**
 * Fetches a Profile by either its full handle or id.
 *
 * ```ts
 * const { data, error, loading } = useProfile({
 *   forHandle: 'lens/stani',
 *   // OR
 *   forProfileId: '0x04',
 * });
 *
 * if (loading) {
 *   return <Loading />;
 * }
 *
 * if (error) {
 *   return <Error error={error} />;
 * }
 *
 * return <Profile profile={data} />;
 * ```
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseProfileArgs}
 */
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs): ReadResult<Profile, NotFoundError | UnspecifiedError>;

/**
 * Fetches a Profile by either its full handle or id.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```ts
 * const { data } = useProfile({
 *   forHandle: 'lens/stani',
 *   suspense: true,
 * });
 *
 * console.log(data.id);
 * ```
 *
 * @experimental This API can change without notice
 * @category Profiles
 * @group Hooks
 */
export function useProfile(
  args: UseSuspenseProfileArgs,
): SuspenseResultWithError<Profile, NotFoundError>;

export function useProfile({
  suspense = false,
  ...request
}: UseProfileArgs & { suspense?: boolean }): UseProfileResult {
  invariant(
    request.forProfileId === undefined || request.forHandle === undefined,
    "Only one of 'forProfileId' or 'forHandle' should be provided to 'useProfile' hook",
  );

  const result = useSuspendableQuery<Profile | null, ProfileVariables>({
    suspense,
    query: ProfileDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({ request }),
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }),
  });

  if (result.data === null) {
    return {
      data: undefined,
      error: profileNotFound(request),
    };
  }

  return result as UseProfileResult;
}
