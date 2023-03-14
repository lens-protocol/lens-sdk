import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
  useFeedQuery,
} from '@lens-protocol/api-bindings';
import { nonNullable } from '@lens-protocol/shared-kernel';

import {
  PaginatedArgs,
  PaginatedReadResult,
  useActiveProfileAsDefaultObserver,
  useConfigSources,
  useLensApolloClient,
  usePaginatedReadResult,
} from '../helpers';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { FeedEventItemType } from './FeedEventItemType';

const SupportedFeedEvenTypesMap: Record<FeedEventItemType, LensFeedEventItemType> = {
  [FeedEventItemType.Comment]: LensFeedEventItemType.Comment,
  [FeedEventItemType.Post]: LensFeedEventItemType.Post,
  [FeedEventItemType.Mirror]: LensFeedEventItemType.Mirror,
  [FeedEventItemType.CollectComment]: LensFeedEventItemType.CollectComment,
  [FeedEventItemType.CollectPost]: LensFeedEventItemType.CollectPost,
};

const mapRestrictEventTypesToLensTypes = (restrictEventTypesTo?: FeedEventItemType[]) => {
  return restrictEventTypesTo?.map((type) =>
    nonNullable(SupportedFeedEvenTypesMap[type], "Can't map the feed event type"),
  );
};

// feed limit is higher than others to get good aggregation of feed items
const FEED_LIMIT = 50;

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string | null;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useFeed({
  metadataFilter,
  restrictEventTypesTo,
  observerId = null,
  profileId,
  limit = FEED_LIMIT,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  return usePaginatedReadResult(
    useFeedQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver(
          useConfigSources({
            metadata: createPublicationMetadataFilters(metadataFilter),
            restrictEventTypesTo: mapRestrictEventTypesToLensTypes(restrictEventTypesTo),
            profileId,
            observerId,
            limit,
          }),
        ),
      ),
    ),
  );
}
