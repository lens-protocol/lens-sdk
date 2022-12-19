import { useProfile, useProfileFollowers, useProfileFollowing } from '@lens-protocol/react';
import { useParams } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type HandleProps = {
  handle: string;
};

type ProfileFollowersProps = {
  profileId: string;
};

type ProfileFollowingProps = {
  walletAddress: string;
};

export function ProfileFollowers({ profileId }: ProfileFollowersProps) {
  const { data: followers, error } = useProfileFollowers({ profileId });
  if (error || !followers) return <GenericError error={error} />;
  return (
    <div>
      <h2>Followers</h2>
      <div>
        {followers.items.map((follower) =>
          follower.wallet.defaultProfile ? (
            <ProfileCard key={follower.wallet.address} profile={follower.wallet.defaultProfile} />
          ) : (
            <div key={follower.wallet.address}>{follower.wallet.address}</div>
          ),
        )}
      </div>
    </div>
  );
}

export function ProfilesFollowing({ walletAddress }: ProfileFollowingProps) {
  const { data: followings, error } = useProfileFollowing({ walletAddress });
  if (error || !followings) return <GenericError error={error} />;
  return (
    <div>
      <h2>Followers</h2>
      <div>
        {followings.items.map((following) => (
          <ProfileCard key={following.profile.handle} profile={following.profile} />
        ))}
      </div>
    </div>
  );
}

export function Handle({ handle }: HandleProps) {
  const { data: profile, loading, error } = useProfile({ handle });

  if (loading) return <Loading />;

  if (error || !profile) return <GenericError error={error} />;

  return (
    <div>
      <div>
        <h1>Profile by Handle</h1>
        <ProfileCard profile={profile} />
        <hr />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <ProfileFollowers profileId={profile.id} />
        <ProfilesFollowing walletAddress={profile.ownedBy} />
      </div>
    </div>
  );
}

export function ProfileByHandle() {
  const { handle } = useParams();
  if (!handle) return <GenericError error={new Error('Profile not found')} />;
  return <Handle handle={handle} />;
}
