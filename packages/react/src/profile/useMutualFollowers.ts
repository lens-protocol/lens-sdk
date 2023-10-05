import {
  LimitType,
  Profile,
  MutualFollowersRequest,
  useMutualFollowers as useMutualFollowersHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useMutualFollowers} hook arguments
 */
export type UseMutualFollowersArgs = PaginatedArgs<MutualFollowersRequest>;

/**
 * `useMutualFollowers` is a paginated hook that lets you fetch mutual followers between two profiles.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useMutualFollowers({
 *   observer: '0x123',
 *   viewing: '0x456',
 * });
 * ```
 */
export function useMutualFollowers({
  observer,
  viewing,
  limit = LimitType.Ten,
}: UseMutualFollowersArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useMutualFollowersHook(
      useLensApolloClient({
        variables: {
          observer,
          viewing,
          limit,
        },
      }),
    ),
  );
}
