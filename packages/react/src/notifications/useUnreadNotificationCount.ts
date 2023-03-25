import { useUnreadNotificationCount as useUnderlyingQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import { useLensApolloClient } from '../helpers/arguments';
import { useSharedDependencies } from '../shared';

export type UseUnreadNotificationCountArgs = {
  profileId: ProfileId;
};

export function useUnreadNotificationCount({ profileId }: UseUnreadNotificationCountArgs) {
  const { notificationStorage } = useSharedDependencies();
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);

  const { loading, data } = useUnderlyingQuery(
    useLensApolloClient({
      variables: { profileId },
      // no cache is required to always have up-to-date information
      // and to not affect notifications cache
      fetchPolicy: 'no-cache',
    }),
  );

  useEffect(() => {
    async function calculate() {
      if (loading) {
        return;
      }

      invariant(
        data?.result.pageInfo.totalCount,
        'Expected total notification count to be defined',
      );

      const readTotalCount = (await notificationStorage.get())?.totalReadNotificationsCount;

      if (readTotalCount) {
        const currentTotalCount = data.result.pageInfo.totalCount;

        setUnreadNotificationCount(currentTotalCount - readTotalCount);
      } else {
        await notificationStorage.set({
          totalReadNotificationsCount: data.result.pageInfo.totalCount,
        });

        setUnreadNotificationCount(0);
      }
    }

    void calculate();
  }, [data, loading, notificationStorage]);

  if (loading) {
    return {
      loading: true,
    };
  }

  if (unreadNotificationCount === 0) {
    return {
      loading: false,
      unreadNotificationCount,
      clear: (): Promise<void> => {
        return Promise.resolve();
      },
    };
  }

  return {
    loading: false,
    unreadNotificationCount,
    clear: async (): Promise<void> => {
      invariant(
        data?.result.pageInfo.totalCount,
        'Expected total notification count to be defined',
      );

      await notificationStorage.set({
        totalReadNotificationsCount: data.result.pageInfo.totalCount,
      });

      setUnreadNotificationCount(0);
    },
  };
}
