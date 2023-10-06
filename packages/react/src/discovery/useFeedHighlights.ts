import {
  FeedHighlight,
  FeedHighlightsRequest,
  useFeedHighlights as useBaseFeedHighlightsQuery,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { OmitCursor, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseFeedHighlightsArgs = OmitCursor<FeedHighlightsRequest>;

/**
 * Fetch a the highlights of a feed for given profile and filters.
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseFeedHighlightsArgs}
 *
 * @example
 * ```tsx
 * import { useFeed, ProfileId } from '@lens-protocol/react-web';
 *
 * function Feed({ profileId }: { profileId: ProfileId }) {
 *   const { data, loading, error } =  useFeed({
 *      where: {
 *        for: profileId,
 *      },
 *    });
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
export function useFeedHighlights({
  where,
}: UseFeedHighlightsArgs): PaginatedReadResult<FeedHighlight[]> {
  return usePaginatedReadResult(
    useBaseFeedHighlightsQuery(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          request: { where },
        }),
      }),
    ),
  );
}
