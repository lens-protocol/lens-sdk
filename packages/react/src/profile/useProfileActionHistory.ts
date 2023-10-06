import {
  ProfileActionHistory,
  ProfileActionHistoryRequest,
  useProfileActionHistory as useProfileActionHistoryHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfileActionHistory} hook arguments
 */
export type UseProfileActionHistoryArgs = PaginatedArgs<ProfileActionHistoryRequest>;

/**
 * `useProfileActionHistory` is a paginated hook that lets you fetch profile action history.
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
  return usePaginatedReadResult(
    useProfileActionHistoryHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
