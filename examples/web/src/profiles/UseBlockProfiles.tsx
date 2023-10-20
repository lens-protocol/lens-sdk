import { Profile, useBlockProfiles, useExploreProfiles } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function ProfileBlockCard({ profile }: { profile: Profile }) {
  const { execute: block, loading, error } = useBlockProfiles();

  if (profile.operations.isBlockedByMe.value) {
    return (
      <ProfileCard profile={profile}>
        <p>Blocked</p>
      </ProfileCard>
    );
  }

  return (
    <ProfileCard profile={profile}>
      <button onClick={() => block({ profiles: [profile] })} disabled={loading}>
        Block
      </button>
      {error && <p>Error blocking profile: {error.message}</p>}
    </ProfileCard>
  );
}

function UseBlockProfilesInner() {
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

export function UseBlockProfiles() {
  return (
    <>
      <WhenLoggedIn>
        <UseBlockProfilesInner />
      </WhenLoggedIn>
      <UnauthenticatedFallback message="Please login to block profiles" />
    </>
  );
}
