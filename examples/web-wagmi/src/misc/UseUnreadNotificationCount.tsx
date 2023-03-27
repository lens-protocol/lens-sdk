import { Profile, useUnreadNotificationCount } from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { Loading } from '../components/loading/Loading';

type NotificationCountInnerProps = {
  profile: Profile;
};

function NotificationCountInner({ profile }: NotificationCountInnerProps) {
  const { unreadNotificationCount, loading, clear } = useUnreadNotificationCount({
    profileId: profile.id,
  });

  if (loading) return <Loading />;

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
      <WhenLoggedInWithProfile>
        {({ profile }) => <NotificationCountInner profile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Login to view notification count" />
    </>
  );
}
