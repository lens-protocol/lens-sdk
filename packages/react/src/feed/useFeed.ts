import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItem,
  useFeed as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { nonNullable } from '@lens-protocol/shared-kernel';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import {
  createPublicationMetadataFilters,
  PublicationMetadataFilters,
} from '../publication/filters';
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

export type UseFeedArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
    restrictEventTypesTo?: FeedEventItemType[];
    metadataFilter?: PublicationMetadataFilters;
  }>
>;

/**
 * `useFeed` is a paginated hook that lets you read the feed of a given profile
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseFeedArgs}
 *
 * @example
 * ```tsx
 * import { useFeed, ProfileId } from '@lens-protocol/react-web';
 *
 * function Feed({ profileId }: { profileId: ProfileId }) {
 *   const { data, loading, error } = useFeed({ profileId });
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <ul>
 *       {data.map((item, idx) => (
 *         <li key={key={`${item.root.id}-${idx}`}}>
 *           // render item details
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useFeed({
  metadataFilter,
  restrictEventTypesTo,
  observerId,
  profileId,
  limit = FEED_LIMIT,
}: UseFeedArgs): PaginatedReadResult<FeedItem[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              metadata: createPublicationMetadataFilters(metadataFilter),
              restrictEventTypesTo: mapRestrictEventTypesToLensTypes(restrictEventTypesTo),
              profileId,
              observerId,
              limit,
            }),
          ),
        }),
      ),
    ),
  );
}
