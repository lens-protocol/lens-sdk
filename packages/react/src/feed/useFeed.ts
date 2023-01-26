import { FeedEventItemType, FeedItemFragment, useFeedQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { useSharedDependencies } from '../shared';

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
  metadataFilter?: PublicationMetadataFilters;
}>;

export { FeedEventItemType };

export function useFeed({
  metadataFilter,
  restrictEventTypesTo,
  observerId,
  profileId,
  limit,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useFeedQuery({
      variables: {
        metadata: createPublicationMetadataFilters(metadataFilter),
        restrictEventTypesTo,
        limit: limit ?? 10,
        observerId,
        profileId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
