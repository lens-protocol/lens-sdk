import { useUnreadNotificationCountQuery } from '@lens-protocol/api';

import { useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseUnreadNotificationCountArgs = {
  profileId: string;
};

export function useUnreadNotificationCount({ profileId }: UseUnreadNotificationCountArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  const response = useReadResult(
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
