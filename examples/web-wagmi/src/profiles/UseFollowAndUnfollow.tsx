import {
  ProfileOwnedByMe,
  useExploreProfiles,
  useFollow,
  useUnfollow,
  Profile,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type FollowButtonProps = {
  follower: ProfileOwnedByMe;
  followee: Profile;
};

function FollowButton({ followee, follower }: FollowButtonProps) {
  const {
    execute: follow,
    error: followError,
    isPending: isFollowPending,
  } = useFollow({ follower, followee });
  const {
    execute: unfollow,
    error: unfollowError,
    isPending: isUnfollowPending,
  } = useUnfollow({ follower, followee });

  if (followee.followStatus === null) {
    return null;
  }

  if (followee.followStatus.isFollowedByMe) {
    return (
      <>
        <button onClick={unfollow} disabled={isUnfollowPending}>
          Unfollow
        </button>
        {unfollowError && <p>{unfollowError.message}</p>}
      </>
    );
  }

  return (
    <>
      <button onClick={follow} disabled={isFollowPending}>
        Follow
      </button>
      {followError && <p>{followError.message}</p>}
    </>
  );
}

type UseFollowInnerProps = {
  activeProfile: ProfileOwnedByMe;
};

function UseFollowInner({ activeProfile }: UseFollowInnerProps) {
  const { data, error, loading } = useExploreProfiles({ limit: 50 });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.map((profile) => (
        <section key={profile.handle}>
          <ProfileCard profile={profile} />

          <FollowButton followee={profile} follower={activeProfile} />
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
