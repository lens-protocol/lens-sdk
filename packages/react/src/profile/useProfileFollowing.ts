import { FollowingFragment, useProfileFollowingQuery } from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileFollowingArgs = PaginatedArgs<{
  walletAddress: string;
  observerId?: string;
}>;

export function useProfileFollowing({
  walletAddress,
  limit,
  observerId,
}: UseProfileFollowingArgs): PaginatedReadResult<FollowingFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowingQuery({
      variables: {
        walletAddress,
        limit: limit ?? 10,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
