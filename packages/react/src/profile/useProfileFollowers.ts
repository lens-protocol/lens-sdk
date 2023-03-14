import { FollowerFragment, useProfileFollowersQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
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
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfileFollowersQuery({
      variables: {
        profileId,
        limit: limit ?? 10,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
