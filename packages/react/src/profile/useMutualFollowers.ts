import { Profile, useMutualFollowersProfiles } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useSourcesFromConfig, useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseMutualFollowersArgs = PaginatedArgs<{
  observerId: ProfileId;
  viewingProfileId: ProfileId;
}>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useMutualFollowers({
  observerId,
  viewingProfileId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseMutualFollowersArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useMutualFollowersProfiles(
      useLensApolloClient({
        variables: useSourcesFromConfig({ limit, observerId, viewingProfileId }),
      }),
    ),
  );
}
