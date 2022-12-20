import { useProfileFollowing } from '@lens-protocol/react';

import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type ProfileFollowingProps = {
  walletAddress: string;
};

export function ProfilesFollowing({ walletAddress }: ProfileFollowingProps) {
  const { data: followings, loading } = useProfileFollowing({ walletAddress });
  if (loading) return <Loading />;
  return (
    <div>
      <h2>Following</h2>
      <div>
        {followings.map((following) => (
          <ProfileCard key={following.profile.handle} profile={following.profile} />
        ))}
      </div>
    </div>
  );
}
