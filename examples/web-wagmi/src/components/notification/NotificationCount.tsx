import { ProfileFieldsFragment, useUnreadNotificationCount } from '@lens-protocol/react';

import { LoginButton } from '../auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../auth/auth';

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

export function NotificationCount() {
  return (
    <>
      <h2>Notification count</h2>
      <WhenLoggedIn>{({ profile }) => <NotificationCountInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
