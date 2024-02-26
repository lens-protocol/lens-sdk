import {
  AnyPublication,
  PublicationBookmarksRequest,
  usePublicationBookmarks,
} from '@lens-protocol/api-bindings';

import { SessionType, useSession } from '../authentication';
import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

export type UseBookmarksArgs = PaginatedArgs<PublicationBookmarksRequest>;

/**
 * `useBookmarks` is a paginated hook that lets you fetch the bookmarks of a profile owned by the logged in wallet.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Bookmarks
 * @group Hooks
 * @param args - {@link UseBookmarksArgs}
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useBookmarks();
 * ```
 */
export function useBookmarks(args: UseBookmarksArgs = {}): PaginatedReadResult<AnyPublication[]> {
  const { data: session } = useSession();

  return usePaginatedReadResult(
    usePublicationBookmarks(
      useLensApolloClient({
        variables: useFragmentVariables({
          request: args,
          statsFor: args.where?.metadata?.publishedOn,
        }),
        skip: session?.type !== SessionType.WithProfile,
      }),
    ),
  );
}
