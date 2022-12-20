import { FollowerFragment, useProfileFollowersQuery } from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowersArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function useProfileFollowers({
  profileId,
  limit,
  observerId,
}: UseProfileFollowersArgs): PaginatedReadResult<FollowerFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowersQuery({
      variables: {
        profileId,
        limit: limit ?? 10,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
