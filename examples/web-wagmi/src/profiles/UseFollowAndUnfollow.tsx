import {
  ProfileFieldsFragment,
  useExploreProfiles,
  useFollow,
  useUnfollow,
} from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type FollowButtonProps = {
  profile: ProfileFieldsFragment;
};

function FollowButton({ profile }: FollowButtonProps) {
  const { follow, isPending: isFollowing } = useFollow({ profile });
  const { unfollow, isPending: isUnfollowing } = useUnfollow({ profile });

  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe)
    return (
      <button onClick={unfollow} disabled={isUnfollowing || profile.isOptimisticFollowedByMe}>
        {isUnfollowing ? 'Unfollowing...' : 'Unfollow'}
      </button>
    );

  return (
    <button onClick={follow} disabled={isFollowing}>
      {isFollowing ? 'Following...' : 'Follow'}
    </button>
  );
}

type ProfileFollowProps = {
  profile: ProfileFieldsFragment;
};

function ProfileFollow({ profile }: ProfileFollowProps) {
  return (
    <article>
      <ProfileCard profile={profile} />
      <FollowButton profile={profile} />
    </article>
  );
}

type UseFollowInnerProps = {
  activeProfile: ProfileFieldsFragment;
};

function UseFollowInner({ activeProfile }: UseFollowInnerProps) {
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

export function UseFollowAndUnfollow() {
  return (
    <div>
      <h1>
        <code>useFollow / useUnFollow</code>
      </h1>
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
