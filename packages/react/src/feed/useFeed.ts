import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
  useFeedQuery,
} from '@lens-protocol/api-bindings';
import { nonNullable } from '@lens-protocol/shared-kernel';

import { FeedEventItemType } from './FeedEventItemType';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { useSharedDependencies } from '../shared';

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
  limit,
}: UseFeedArgs): PaginatedReadResult<FeedItemFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useFeedQuery({
      variables: {
        metadata: createPublicationMetadataFilters(metadataFilter),
        restrictEventTypesTo: mapRestrictEventTypesToLensTypes(restrictEventTypesTo),
        profileId,
        observerId,
        sources,
        limit: limit ?? 10,
      },
      client: apolloClient,
    }),
  );
}
