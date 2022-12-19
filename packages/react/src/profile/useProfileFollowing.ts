import { useProfileFollowingQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
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

  const response = useLensResponse(
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

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
