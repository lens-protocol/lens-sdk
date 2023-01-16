import {
  ProfileFieldsFragment,
  useExploreProfiles,
  useFollow,
  useUnfollow,
} from '@lens-protocol/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedIn } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type FollowButtonProps = {
  profile: ProfileFieldsFragment;
};

const toastNotification = (error: Error) => toast.error(error.message);

function FollowButton({ profile }: FollowButtonProps) {
  const { follow, isPending: isFollowing } = useFollow({ profile });
  const { unfollow, isPending: isUnfollowing, error } = useUnfollow({ profile });

  useEffect(() => {
    if (error && 'message' in error) toastNotification(error);
  }, [error]);

  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe)
    return (
      <button onClick={unfollow} disabled={isUnfollowing}>
        Unfollow
      </button>
    );

  return (
    <button onClick={follow} disabled={isFollowing}>
      Follow
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
      <UnauthenticatedFallback message="Log in to follow or unfollow profiles" />
    </div>
  );
}
