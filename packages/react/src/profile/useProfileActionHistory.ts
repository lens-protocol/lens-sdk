import {
  ProfileActionHistory,
  ProfileActionHistoryRequest,
  useProfileActionHistory as useProfileActionHistoryHook,
} from '@lens-protocol/api-bindings';

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

  return usePaginatedReadResult(
    useProfileActionHistoryHook(
      useLensApolloClient({
        variables: args,
        skip: session?.type !== SessionType.WithProfile,
      }),
    ),
  );
}
