import { FeedItem, FeedRequest, useFeed as useBaseFeedQuery } from '@lens-protocol/api-bindings';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { OmitCursor, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseFeedArgs = OmitCursor<FeedRequest>;

/**
 * Fetch a the feed of a given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseFeedArgs}
 *
 * @example
 * ```tsx
 * import { useFeed, ProfileId } from '@lens-protocol/react';
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
 *         <li key={`${item.root.id}-${idx}`}>
 *           // render item details
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useFeed({ where }: UseFeedArgs): PaginatedReadResult<FeedItem[]> {
  const { data: session } = useSession();

  return usePaginatedReadResult(
    useBaseFeedQuery(
      useLensApolloClient({
        variables: useFragmentVariables({
          where,
          statsFor: where?.metadata?.publishedOn,
        }),
        skip: session?.type !== SessionType.WithProfile,
      }),
    ),
  );
}
