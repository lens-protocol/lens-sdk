import { useFeedQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = {
  profileId: string;
  observerId?: string;
  limit?: number;
};

export function useFeed({ profileId, observerId, limit }: UseFeedArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  const response = useLensResponse(
    useFeedQuery({
      variables: {
        profileId,
        observerId,
        limit: limit ?? 10,
        sources,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
