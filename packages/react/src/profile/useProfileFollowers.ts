import { useProfileFollowersQuery } from '@lens-protocol/api';

import { useLensResponseWithPagination } from '../helpers';
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
}: UseProfileFollowersArgs) {
  const { apolloClient } = useSharedDependencies();

  return useLensResponseWithPagination(
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
