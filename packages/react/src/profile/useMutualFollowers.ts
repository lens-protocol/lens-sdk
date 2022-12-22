import { ProfileFieldsFragment, useMutualFollowersProfilesQuery } from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseMutualFollowersArgs = PaginatedArgs<{
  observerId: string;
  viewingProfileId: string;
}>;

export function useMutualFollowers({
  observerId,
  viewingProfileId,
  limit,
}: UseMutualFollowersArgs): PaginatedReadResult<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useMutualFollowersProfilesQuery({
      variables: {
        observerId,
        viewingProfileId,
        limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
      },
      client: apolloClient,
    }),
  );
}
