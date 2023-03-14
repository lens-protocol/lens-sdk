import { FollowingFragment, useProfileFollowingQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
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
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowingQuery({
      variables: {
        walletAddress,
        limit: limit ?? 10,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
