import { useUnreadNotificationCountQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UnreadNotificationCountArgs = {
  profileId: string;
};

export function useUnreadNotificationCount({ profileId }: UnreadNotificationCountArgs) {
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
