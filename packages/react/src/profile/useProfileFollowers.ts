import {
  LimitType,
  Profile,
  FollowersRequest,
  useFollowers as useFollowersHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfileFollowers} hook arguments
 */
export type UseProfileFollowersArgs = PaginatedArgs<FollowersRequest>;

/**
 * `useProfileFollowers` is a paginated hook that lets you fetch profiles that follow a requested profile.
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowers({
  of,
  limit = LimitType.Ten,
}: UseProfileFollowersArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useFollowersHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          of,
          limit,
        }),
      }),
    ),
  );
}
