import {
  ProfileActionHistory,
  ProfileActionHistoryRequest,
  useProfileActionHistory as useProfileActionHistoryHook,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfileActionHistory} hook arguments
 */
export type UseProfileActionHistoryArgs = PaginatedArgs<ProfileActionHistoryRequest>;

/**
 * `useProfileActionHistory` is a paginated hook that lets you fetch profile action history.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useProfileActionHistory();
 * ```
 */
export function useProfileActionHistory(
  args: UseProfileActionHistoryArgs = {},
): PaginatedReadResult<ProfileActionHistory[]> {
  const { data: session } = useSession();

  invariant(session?.authenticated, 'You must be authenticated.');
  invariant(
    session.type === SessionType.WithProfile,
    'You must be authenticated with a profile to use this query. Use `useLogin` hook to authenticate.',
  );

  return usePaginatedReadResult(
    useProfileActionHistoryHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
