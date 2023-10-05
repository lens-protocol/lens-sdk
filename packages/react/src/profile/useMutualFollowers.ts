import {
  LimitType,
  Profile,
  MutualFollowersRequest,
  useMutualFollowers as useMutualFollowersHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
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
 */
export function useMutualFollowers({
  observer,
  viewing,
  limit = LimitType.Ten,
}: UseMutualFollowersArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useMutualFollowersHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          observer,
          viewing,
          limit,
        }),
      }),
    ),
  );
}
