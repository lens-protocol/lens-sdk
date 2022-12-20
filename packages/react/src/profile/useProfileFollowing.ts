import { FollowingFragment, useProfileFollowingQuery } from '@lens-protocol/api';

import { PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowingArgs = {
  walletAddress: string;
  limit?: number;
  cursor?: string;
  observerId?: string;
};

export function useProfileFollowing({
  walletAddress,
  limit,
  cursor,
  observerId,
}: UseProfileFollowingArgs): PaginatedReadResult<FollowingFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowingQuery({
      variables: {
        walletAddress,
        limit: limit ?? 10,
        cursor,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
