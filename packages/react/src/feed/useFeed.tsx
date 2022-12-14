import { useFeedQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = {
  activeProfileId: string;
};

export function useFeed({ activeProfileId }: UseFeedArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  const response = useLensResponse(
    useFeedQuery({
      variables: {
        activeProfileId,
        limit: 10,
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
