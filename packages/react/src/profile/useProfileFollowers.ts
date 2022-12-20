import { FollowerFragment, useProfileFollowersQuery } from '@lens-protocol/api';

import { PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowersArgs = {
  profileId: string;
  limit?: number;
  cursor?: string;
  observerId?: string;
};

export function useProfileFollowers({
  profileId,
  limit,
  cursor,
  observerId,
}: UseProfileFollowersArgs): PaginatedReadResult<FollowerFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowersQuery({
      variables: {
        profileId,
        limit: limit ?? 10,
        cursor,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
