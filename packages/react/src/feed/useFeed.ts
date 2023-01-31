import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
  useFeedQuery,
} from '@lens-protocol/api-bindings';
import { never } from '@lens-protocol/shared-kernel';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from '../publication';
import { useSharedDependencies } from '../shared';
import { FeedEventItemType } from './FeedEventItemType';

export type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
  profileId: string;
  restrictEventTypesTo?: FeedEventItemType[];
  metadataFilter?: PublicationMetadataFilters;
}>;

const mapRestrictEventTypesToLensTypes = (restrictEventTypesTo?: FeedEventItemType[]) => {
  return restrictEventTypesTo?.map((type) => {
    if (type === FeedEventItemType.Comment) {
      return LensFeedEventItemType.Comment;
    } else if (type === FeedEventItemType.Post) {
      return LensFeedEventItemType.Post;
    } else if (type === FeedEventItemType.Mirror) {
      return LensFeedEventItemType.Mirror;
    } else if (type === FeedEventItemType.CollectComment) {
      return LensFeedEventItemType.CollectComment;
    } else if (type === FeedEventItemType.CollectPost) {
      return LensFeedEventItemType.CollectPost;
    }

    never('Unknown FeedEventItemType');
  });
};

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
