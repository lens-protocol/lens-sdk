import {
  ContentPublication,
  ProfileOwnedByMe,
  useGetProfileBookmarks,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { PublicationMetadataFilters } from './filters';

export type UseMyBookmarksArgs = PaginatedArgs<
  WithObserverIdOverride<{
    metadataFilter?: PublicationMetadataFilters;
    /**
     * The profile to fetch bookmarked publications for.
     */
    profile: ProfileOwnedByMe;
  }>
>;

/**
 * `useMyBookmarks` is a paginated hook that lets you fetch the bookmarks of a profile owned by the logged in wallet.
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 * By default it will fetch the bookmarks of the Active Profile.
 *
 * @category Bookmarks
 * @group Hooks
 * @param args - {@link UseMyBookmarksArgs}
 */
export function useMyBookmarks({
  profile,
  observerId,
  metadataFilter,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseMyBookmarksArgs): PaginatedReadResult<ContentPublication[]> {
  invariant(
    profile.ownedByMe,
    `The provided 'profile' is not owned by the authenticated wallet.\n` +
      `Use the 'useActiveProfile' or 'useProfilesOwnedByMe' hooks to get a 'ProfileOwnedByMe' instance.`,
  );

  return usePaginatedReadResult(
    useGetProfileBookmarks(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              profileId: profile.id,
              metadataFilter,
              limit,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
