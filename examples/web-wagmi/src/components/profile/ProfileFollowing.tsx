import { useProfileFollowing } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type ProfileFollowingProps = {
  walletAddress: string;
};

export function ProfilesFollowing({ walletAddress }: ProfileFollowingProps) {
  const { data: followings, loading, error } = useProfileFollowing({ walletAddress });
  if (loading) return <Loading />;
  if (error || !followings) return <GenericError error={error} />;
  return (
    <div>
      <h2>Following</h2>
      <div>
        {followings.items.map((following) => (
          <ProfileCard key={following.profile.handle} profile={following.profile} />
        ))}
      </div>
    </div>
  );
}
