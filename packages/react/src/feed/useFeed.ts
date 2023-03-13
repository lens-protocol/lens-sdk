import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
  useFeedQuery,
} from '@lens-protocol/api-bindings';
import { nonNullable } from '@lens-protocol/shared-kernel';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useActiveProfileIdentifier } from '../profile/useActiveProfileIdentifier';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { useSharedDependencies } from '../shared';
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
  observerId?: string;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useFeed({
  metadataFilter,
  restrictEventTypesTo,
  observerId,
  profileId,
  limit = FEED_LIMIT,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();
  const { data: activeProfile, loading: bootstrapping } = useActiveProfileIdentifier();

  return usePaginatedReadResult(
    useFeedQuery({
      variables: {
        metadata: createPublicationMetadataFilters(metadataFilter),
        restrictEventTypesTo: mapRestrictEventTypesToLensTypes(restrictEventTypesTo),
        profileId,
        observerId: observerId ?? activeProfile?.id ?? null,
        sources,
        limit,
      },
      client: apolloClient,
      skip: bootstrapping,
    }),
  );
}
