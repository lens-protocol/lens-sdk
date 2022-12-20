import { useProfileFollowingQuery } from '@lens-protocol/api';

import { useLensResponseWithPagination } from '../helpers';
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
}: UseProfileFollowingArgs) {
  const { apolloClient } = useSharedDependencies();

  return useLensResponseWithPagination(
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
