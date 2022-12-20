import { useUnreadNotificationCountQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseUnreadNotificationCountArgs = {
  profileId: string;
};

export function useUnreadNotificationCount({ profileId }: UseUnreadNotificationCountArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  const response = useLensResponse(
    useUnreadNotificationCountQuery({
      variables: {
        profileId,
        sources,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result.pageInfo.totalCount ?? null,
  };
}
