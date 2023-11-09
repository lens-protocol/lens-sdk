import {
  AnyPublication,
  PublicationBookmarksRequest,
  usePublicationBookmarks,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

export type UseBookmarksArgs = PaginatedArgs<PublicationBookmarksRequest>;

/**
 * `useBookmarks` is a paginated hook that lets you fetch the bookmarks of a profile owned by the logged in wallet.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Bookmarks
 * @group Hooks
 * @param args - {@link useBookmarksArgs}
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useBookmarks();
 * ```
 */
export function useBookmarks(args: UseBookmarksArgs = {}): PaginatedReadResult<AnyPublication[]> {
  const { data: session } = useSession();

  invariant(session?.authenticated, 'You must be authenticated.');
  invariant(
    session.type === SessionType.WithProfile,
    'You must be authenticated with a profile to use this query. Use `useLogin` hook to authenticate.',
  );

  return usePaginatedReadResult(
    usePublicationBookmarks(
      useLensApolloClient({
        variables: {
          request: args,
        },
      }),
    ),
  );
}

/**
 * @deprecated Use {@link useBookmarks} instead.
 */
export const useMyBookmarks = useBookmarks;

/**
 * @deprecated Use {@link UseBookmarksArgs} instead.
 */
export type UseMyBookmarksArgs = UseBookmarksArgs;
