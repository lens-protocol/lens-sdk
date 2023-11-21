import { Follower, useProfileFollowers as useUnderlyingQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfileFollowersArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
  }>
>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowers({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  profileId,
}: UseProfileFollowersArgs): PaginatedReadResult<Follower[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({ profileId, limit, observerId }),
          ),
        }),
      ),
    ),
  );
}
