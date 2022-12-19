import { FeedItemFragment, useFeedQuery } from '@lens-protocol/api';

import {
  LensResponseWithPagination,
  PaginatedArgs,
  useLensResponseWithPagination,
} from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function useFeed({
  profileId,
  observerId,
  limit,
  cursor,
}: UseFeedArgs): LensResponseWithPagination<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return useLensResponseWithPagination(
    useFeedQuery({
      variables: {
        profileId,
        observerId,
        sources,
        limit: limit ?? 10,
        cursor: cursor ?? undefined,
      },
      client: apolloClient,
    }),
  );
}
