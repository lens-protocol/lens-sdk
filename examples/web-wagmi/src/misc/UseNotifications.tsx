import { Profile, useNotifications } from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { NotificationItem } from './components/NotificationItem';

type NotificationsInnerProps = {
  profile: Profile;
};

function NotificationsInner({ profile }: NotificationsInnerProps) {
  const {
    data: notifications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useNotifications({ profileId: profile.id }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
