import {
  LimitType,
  Profile,
  FollowingRequest,
  useFollowing as useFollowingHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfileFollowing} hook arguments
 */
export type UseProfileFollowingArgs = PaginatedArgs<FollowingRequest>;

/**
 * `useProfileFollowing` is a paginated hook that lets you fetch profiles that are followed by a requested profile.
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowing({
  for: forId,
  limit = LimitType.Ten,
}: UseProfileFollowingArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useFollowingHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          for: forId,
          limit,
        }),
      }),
    ),
  );
}
