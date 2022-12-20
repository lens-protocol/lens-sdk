import { ProfileFieldsFragment, useNotifications } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { LoginButton } from '../auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../auth/auth';
import { NotificationItem } from './NotificationItem';

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
    return <p>No notifcations</p>;
  }

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.notificationId}>
          <NotificationItem notification={notification} />
          <hr />
        </div>
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function Notifications() {
  return (
    <>
      <h1>Notifications</h1>
      <WhenLoggedIn>{({ profile }) => <NotificationsInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
