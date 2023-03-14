import { ProfileFragment, useMutualFollowersProfilesQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseMutualFollowersArgs = PaginatedArgs<{
  observerId: ProfileId;
  viewingProfileId: ProfileId;
}>;

export function useMutualFollowers({
  observerId,
  viewingProfileId,
  limit,
}: UseMutualFollowersArgs): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useMutualFollowersProfilesQuery({
      variables: {
        observerId,
        viewingProfileId,
        limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
        sources,
      },
      client: apolloClient,
    }),
  );
}
