import { Profile, useExploreProfiles, useUnblockProfiles } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function ProfileBlockCard({ profile }: { profile: Profile }) {
  const { execute: block, loading, error } = useUnblockProfiles();

  if (!profile.operations.isBlockedByMe.value) {
    return (
      <ProfileCard profile={profile}>
        <p>Not blocked</p>
      </ProfileCard>
    );
  }

  return (
    <ProfileCard profile={profile}>
      <button onClick={() => block({ profiles: [profile] })} disabled={loading}>
        Unblock
      </button>
      {error && <p>Error unblocking profile: {error.message}</p>}
    </ProfileCard>
  );
}

function UseUnblockProfilesInner() {
  const { data: profiles, loading, error } = useExploreProfiles();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {profiles.map((profile) => (
        <ProfileBlockCard key={profile.id} profile={profile} />
      ))}
    </>
  );
}

export function UseUnblockProfiles() {
  return (
    <>
      <WhenLoggedIn>
        <UseUnblockProfilesInner />
      </WhenLoggedIn>
      <UnauthenticatedFallback message="Please login to unblock profiles" />
    </>
  );
}
