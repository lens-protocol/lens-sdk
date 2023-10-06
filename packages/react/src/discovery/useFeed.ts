import { FeedItem, FeedRequest, useFeed as useBaseFeedQuery } from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { OmitCursor, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseFeedArgs = OmitCursor<FeedRequest>;

/**
 * Fetch a the feed a given profile and filters.
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
export function useFeed({ where }: UseFeedArgs): PaginatedReadResult<FeedItem[]> {
  return usePaginatedReadResult(
    useBaseFeedQuery(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          request: { where },
        }),
      }),
    ),
  );
}
