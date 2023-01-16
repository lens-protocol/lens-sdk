import { ProfileFieldsFragment, useUnreadNotificationCount } from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedIn } from '../components/auth/auth';

type NotificationCountInnerProps = {
  profile: ProfileFieldsFragment;
};

function NotificationCountInner({ profile }: NotificationCountInnerProps) {
  const { unreadNotificationCount, loading, clear } = useUnreadNotificationCount({
    profileId: profile.id,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>
        Unread notification count for {profile.handle}: <span>{unreadNotificationCount}</span>
      </p>

      <button onClick={clear}>Mark all notifications as read</button>
      <hr />
    </div>
  );
}

export function UseUnreadNotificationCount() {
  return (
    <>
      <h2>Notification count</h2>
      <WhenLoggedIn>{({ profile }) => <NotificationCountInner profile={profile} />}</WhenLoggedIn>
      <UnauthenticatedFallback message="Login to view notification count" />
    </>
  );
}
