import {
  ProfileFragment,
  ProfileOwnedByMeFragment,
  useExploreProfiles,
  useFollow,
} from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type FollowButtonProps = {
  disabled: boolean;
  profile: ProfileFragment;
  onFollow: () => void;
};

function FollowButton({ disabled, profile, onFollow }: FollowButtonProps) {
  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe)
    return <button disabled={disabled}>Unfollow</button>;

  return (
    <button onClick={onFollow} disabled={disabled}>
      Follow
    </button>
  );
}

type UseFollowInnerProps = {
  activeProfile: ProfileOwnedByMeFragment;
};

function UseFollowInner({ activeProfile }: UseFollowInnerProps) {
  const { data, error, loading } = useExploreProfiles({ observerId: activeProfile.id, limit: 50 });
  const { execute: follow, isPending: isFollowPending } = useFollow({ follower: activeProfile });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.map((profile) => (
        <section key={profile.handle}>
          <ProfileCard profile={profile} />
          <FollowButton
            disabled={isFollowPending}
            onFollow={() => follow({ followee: profile })}
            profile={profile}
          />
        </section>
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
      <WhenLoggedInWithProfile>
        {({ profile }) => <UseFollowInner activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to follow or unfollow profiles" />
    </div>
  );
}
