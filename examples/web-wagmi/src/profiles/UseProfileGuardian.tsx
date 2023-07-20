import { Profile, useProfileGuardian } from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function formatCooldownPeriodEndsAt(timestamp: string | null) {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString();
}

type ProfileGuardianSettingsProps = {
  profile: Profile;
};

function ProfileGuardianSettings({ profile }: ProfileGuardianSettingsProps) {
  const { data, error, loading } = useProfileGuardian({ profileId: profile.id });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <p>
        Profile: <strong>{profile.handle}</strong>
      </p>
      <p>
        Protected: <strong>{data.protected ? 'YES' : 'NO'}</strong>
      </p>
      <p>
        Cooldown Period ends on:{' '}
        <strong>{formatCooldownPeriodEndsAt(data.disablingProtectionTimestamp)}</strong>
      </p>
    </>
  );
}

export function UseProfileGuardian() {
  return (
    <div>
      <h1>
        <code>useProfileGuardian</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ profile }) => <ProfileGuardianSettings profile={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
