import { ProfileFragment, useNotifications } from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { NotificationItem } from './components/NotificationItem';

type NotificationsInnerProps = {
  profile: ProfileFragment;
};

function NotificationsInner({ profile }: NotificationsInnerProps) {
  const {
    loading,
    data: notifications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useNotifications({ profileId: profile.id }));

  if (loading) return <div>Loading...</div>;

  if (notifications.length === 0) {
    return <p>No notifications</p>;
  }

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.notificationId} notification={notification} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseNotifications() {
  return (
    <>
      <h2>Notifications</h2>
      <WhenLoggedInWithProfile>
        {({ profile }) => <NotificationsInner profile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to view notifications." />
    </>
  );
}
