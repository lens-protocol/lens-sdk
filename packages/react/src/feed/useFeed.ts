import { FeedEventItemType, FeedItemFragment, useFeedQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { PublicationFilters } from '../publication/filters';
import { useSharedDependencies } from '../shared';

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
}> &
  PublicationFilters;

export { FeedEventItemType };

export function useFeed({
  profileId,
  limit,
  observerId,
  restrictEventTypesTo,
  restrictPublicationMainFocusTo,
  restrictPublicationTagsTo: tags,
  showPublicationsWithContentWarnings,
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
        metadata: {
          mainContentFocus: restrictPublicationMainFocusTo,
          tags,
          contentWarning: {
            includeOneOf: showPublicationsWithContentWarnings?.oneOf,
          },
        },
      },
      client: apolloClient,
    }),
  );
}
