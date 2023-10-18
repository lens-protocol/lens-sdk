import {
  AnyPublication,
  PublicationBookmarksRequest,
  usePublicationBookmarks as useGetProfileBookmarks,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseMyBookmarksArgs = PaginatedArgs<PublicationBookmarksRequest>;

/**
 * `useMyBookmarks` is a paginated hook that lets you fetch the bookmarks of a profile owned by the logged in wallet.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Bookmarks
 * @group Hooks
 * @param args - {@link UseMyBookmarksArgs}
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useMyBookmarks();
 *
 * if (loading) return <p>Loading...</p>;
 *
 * return (
 *  <div>
 *   {data.map((publication) => (
 *    <PublicationCard publication={publication} key={publication.id} />
 *  ))}
 * </div>
 * );
 * ```
 */
export function useMyBookmarks({ where, limit }: UseMyBookmarksArgs = {}): PaginatedReadResult<
  AnyPublication[]
> {
  return usePaginatedReadResult(
    useGetProfileBookmarks(
      useLensApolloClient({
        variables: {
          request: { where, limit },
        },
      }),
    ),
  );
}
