import { useProfileFollowersQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
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

  const response = useLensResponse(
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

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
