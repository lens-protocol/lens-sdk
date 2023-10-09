import {
  FeedHighlight,
  FeedHighlightsRequest,
  useFeedHighlights as useBaseFeedHighlightsQuery,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { OmitCursor, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

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
 * import { useFeedHighlights, ProfileId } from '@lens-protocol/react';
 *
 * function Feed({ profileId }: { profileId: ProfileId }) {
 *   const { data, loading, error } =  useFeedHighlights({
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
 *       {data.map((item) => (
 *         <li key={item.id}>
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
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseFeedHighlightsArgs): PaginatedReadResult<FeedHighlight[]> {
  return usePaginatedReadResult(
    useBaseFeedHighlightsQuery(
      useLensApolloClient({
        variables: {
          where,
          limit,
        },
      }),
    ),
  );
}
