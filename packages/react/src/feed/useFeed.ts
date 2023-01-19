import { FeedEventItemType, FeedItemFragment, useFeedQuery } from '@lens-protocol/api-bindings';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
}>;

export { FeedEventItemType };

export function useFeed({
  profileId,
  limit,
  observerId,
  restrictEventTypesTo,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useFeedQuery({
      variables: {
        restrictEventTypesTo,
        profileId,
        observerId,
        sources,
        limit: limit ?? 10,
      },
      client: apolloClient,
    }),
  );
}
