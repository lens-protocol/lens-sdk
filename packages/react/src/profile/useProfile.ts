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
import {
  ReadResult,
  SuspenseEnabled,
  SuspenseResultWithError,
  useSuspendableQuery,
} from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

function profileNotFound({ forProfileId, forHandle }: UseProfileArgs<boolean>) {
  return new NotFoundError(
    forProfileId
      ? `Profile with id: ${forProfileId}`
      : `Profile with handle: ${forHandle ? forHandle : ''}`,
  );
}

/**
 * {@link useProfile} hook arguments
 */
export type UseProfileArgs<TSuspense extends boolean = never> = OneOf<ProfileRequest> &
  SuspenseEnabled<TSuspense>;

export type UseProfileResult =
  | ReadResult<Profile, NotFoundError | UnspecifiedError>
  | SuspenseResultWithError<Profile, NotFoundError>;

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
export function useProfile({
  forHandle,
  forProfileId,
}: UseProfileArgs<never>): ReadResult<Profile, NotFoundError | UnspecifiedError>;
export function useProfile(
  args: UseProfileArgs<true>,
): SuspenseResultWithError<Profile, NotFoundError>;
export function useProfile({
  suspense = false,
  ...request
}: UseProfileArgs<boolean>):
  | ReadResult<Profile, NotFoundError | UnspecifiedError>
  | SuspenseResultWithError<Profile, NotFoundError> {
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
