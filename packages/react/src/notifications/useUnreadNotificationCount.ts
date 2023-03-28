import { useUnreadNotificationCount as useUnderlyingQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import { useLensApolloClient } from '../helpers/arguments';
import { useSharedDependencies } from '../shared';

export type UseUnreadNotificationCountArgs = {
  /**
   * The profile id you want to retrieve the number of unread notifications for
   */
  profileId: ProfileId;
};

/**
 * `useUnreadNotificationCount` is a hook that lets you retrieve the number of unread notifications for a given profile
 *
 * It also provides a `clear` function that you can use to mark all notifications as read
 *
 * @category Notifications
 * @group Hooks
 * @param props - {@link UseUnreadNotificationCountArgs}
 *
 * @example
 * ```tsx
 * import { useUnreadNotificationCount, ProfileId } from '@lens-protocol/react-web';
 *
 * function UnreadNotifications({ profileId }: { profileId: ProfileId }}) {
 *   const { unreadNotificationCount, clear, loading } = useUnreadNotificationCount({ profileId });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   return (
 *     <div>
 *       <p>You have {unreadNotificationCount} unread notifications</p>
 *       <button onClick={clear}>Mark all as read</button>
 *     </div>
 *   );
 * }
 * ```
 */
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
