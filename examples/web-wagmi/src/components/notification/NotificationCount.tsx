import { useProfile, useUnreadNotificationCount } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';

export function NotificationCount() {
  const {
    data: unreadNotificationCount,
    loading: notificationCountLoading,
    error: notificationCountError,
  } = useUnreadNotificationCount({ profileId: '0x3a2a' });
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile({ handle: 'lensprotocol' });

  if (notificationCountLoading || profileLoading) return <div>Loading...</div>;

  if (notificationCountError || profileError || !unreadNotificationCount || !profile) {
    return <GenericError error={notificationCountError || profileError} />;
  }

  return (
    <div>
      <h1>Notification count</h1>
      <p>
        Unread notification count: <span>{unreadNotificationCount}</span>
      </p>
      <p>Profile handle: {profile?.handle}</p>
      <hr />
      <pre>{JSON.stringify({ unreadNotificationCount, profile }, null, 2)}</pre>
    </div>
  );
}
