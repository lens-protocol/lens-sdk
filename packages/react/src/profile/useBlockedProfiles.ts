import { Profile, useWhoHaveBlocked, WhoHaveBlockedRequest } from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useBlockedProfiles} hook arguments
 */
export type UseBlockedProfilesArgs = PaginatedArgs<WhoHaveBlockedRequest>;

/**
 * Fetch profiles that the authenticated profile has blocked.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useBlockedProfiles();
 * ```
 */
export function useBlockedProfiles(
  args: UseBlockedProfilesArgs = {},
): PaginatedReadResult<Profile[]> {
  const { data: session } = useSession();

  invariant(session?.authenticated, 'You must be authenticated.');
  invariant(
    session.type === SessionType.WithProfile,
    'You must be authenticated with a profile to use this query. Use `useLogin` hook to authenticate.',
  );

  return usePaginatedReadResult(
    useWhoHaveBlocked(
      useLensApolloClient({
        variables: useFragmentVariables(args),
      }),
    ),
  );
}
