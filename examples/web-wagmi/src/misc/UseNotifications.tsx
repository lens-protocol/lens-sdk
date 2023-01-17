import { ProfileFieldsFragment, useNotifications } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { NotificationItem } from './components/NotificationItem';

type NotificationsInnerProps = {
  profile: ProfileFieldsFragment;
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
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
