import {
  FeedHighlight,
  FeedHighlightsRequest,
  useFeedHighlights as useBaseFeedHighlightsQuery,
} from '@lens-protocol/api-bindings';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseFeedHighlightsArgs = PaginatedArgs<FeedHighlightsRequest>;

/**
 * Fetch a the highlights of a feed for given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
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
}: UseFeedHighlightsArgs): PaginatedReadResult<FeedHighlight[]> {
  const { data: session } = useSession();

  return usePaginatedReadResult(
    useBaseFeedHighlightsQuery(
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
