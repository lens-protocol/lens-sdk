import { Follower, useProfileFollowers as useUnderlyingQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfileFollowersArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
  }>
>;

export function useProfileFollowers({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  profileId,
}: UseProfileFollowersArgs): PaginatedReadResult<Follower[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({ profileId, limit, observerId }),
        }),
      ),
    ),
  );
}
