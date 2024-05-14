import { FeedDocument, FeedItem, FeedRequest, FeedWhere } from '@lens-protocol/api-bindings';

import { SessionType, UseSessionArgs, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult } from '../helpers/reads';
import {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  useSuspendablePaginatedQuery,
} from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useFeed} hook arguments
 */
export type UseFeedArgs = PaginatedArgs<FeedRequest>;

export type { FeedRequest, FeedWhere };

/**
 * {@link useFeed} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspenseFeedArgs = SuspenseEnabled<UseFeedArgs>;

/**
 * Fetch a the feed of a given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { data, loading, error } =  useFeed({
 *   where: {
 *     for: '0x01`, // profileId
 *   },
 * });
 *
 * if (loading) return <div>Loading...</div>;
 *
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <ul>
 *     {data.map((item, idx) => (
 *       <li key={`${item.root.id}-${idx}`}>
 *         // render item details
 *       </li>
 *     ))}
 *   </ul>
 * );
 * ```
 *
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseFeedArgs}
 */
export function useFeed({ where }: UseFeedArgs): PaginatedReadResult<FeedItem[]>;

/**
 * Fetch a the feed of a given profile and filters.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * @example
 * ```tsx
 * const { data, loading, error } =  useFeed({
 *   where: {
 *     for: '0x01`, // profileId
 *   },
 *   suspense: true,
 * });
 *
 * return (
 *   <ul>
 *     {data.map((item, idx) => (
 *       <li key={`${item.root.id}-${idx}`}>
 *         // render item details
 *       </li>
 *     ))}
 *   </ul>
 * );
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 * @param args - {@link UseSuspenseFeedArgs}
 */
export function useFeed({ where }: UseSuspenseFeedArgs): SuspensePaginatedResult<FeedItem[]>;

export function useFeed({
  suspense = false,
  where,
}: UseFeedArgs & { suspense?: boolean }): SuspendablePaginatedResult<FeedItem[]> {
  const { data: session } = useSession({ suspense } as UseSessionArgs);

  return useSuspendablePaginatedQuery({
    suspense,
    query: FeedDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({
        where,
        statsFor: where?.metadata?.publishedOn,
      }),
      skip: session.type !== SessionType.WithProfile,
    }),
  });
}
