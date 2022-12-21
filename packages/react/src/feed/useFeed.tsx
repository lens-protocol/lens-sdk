import { FeedItemFragment, useFeedQuery } from '@lens-protocol/api';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function useFeed({
  profileId,
  observerId,
  limit,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useFeedQuery({
      variables: {
        profileId,
        observerId,
        sources,
        limit: limit ?? 10,
      },
      client: apolloClient,
    }),
  );
}
