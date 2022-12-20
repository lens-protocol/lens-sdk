import { ProfileFieldsFragment, useUnreadNotificationCount } from '@lens-protocol/react';

import { AuthButton } from '../auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../auth/auth';
import { GenericError } from '../error/GenericError';

type NotificationCountInnerProps = {
  profile: ProfileFieldsFragment;
};

function NotificationCountInner({ profile }: NotificationCountInnerProps) {
  const {
    data: unreadNotificationCount,
    loading: notificationCountLoading,
    error: notificationCountError,
  } = useUnreadNotificationCount({ profileId: profile.id });

  if (notificationCountLoading) return <div>Loading...</div>;

  if (notificationCountError || !unreadNotificationCount) {
    return <GenericError error={notificationCountError} />;
  }

  return (
    <div>
      <p>
        Unread notification count for {profile.handle}: <span>{unreadNotificationCount}</span>
      </p>
      <hr />
    </div>
  );
}

export function NotificationCount() {
  return (
    <>
      <h1>Notification count</h1>
      <WhenLoggedIn>{({ profile }) => <NotificationCountInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <AuthButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
