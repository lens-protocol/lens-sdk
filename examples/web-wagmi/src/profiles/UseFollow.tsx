import { ProfileFieldsFragment, useExploreProfiles, useFollow } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type ProfileFollowProps = {
  profile: ProfileFieldsFragment;
};

function FollowButton({ profile }: ProfileFollowProps) {
  const { follow, isPending } = useFollow({ profile });

  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) return <p>Following</p>;

  return (
    <button onClick={follow} disabled={isPending}>
      {isPending ? 'Following...' : 'Follow'}
    </button>
  );
}

function ProfileFollow({ profile }: ProfileFollowProps) {
  return (
    <article>
      <ProfileCard profile={profile} />
      <FollowButton profile={profile} />
    </article>
  );
}

function UseFollowInner({ activeProfile }: { activeProfile: ProfileFieldsFragment }) {
  const { data, loading } = useExploreProfiles({ observerId: activeProfile.id, limit: 50 });

  if (loading) return <Loading />;

  return (
    <>
      {data.map((profile: ProfileFieldsFragment) => (
        <ProfileFollow key={profile.handle} profile={profile} />
      ))}
    </>
  );
}

export function UseFollow() {
  return (
    <div>
      <h1>UseFollow</h1>
      <WhenLoggedIn>{({ profile }) => <UseFollowInner activeProfile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>Log in to follow profiles.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
