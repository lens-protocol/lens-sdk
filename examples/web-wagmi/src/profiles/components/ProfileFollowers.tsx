import { useProfileFollowers } from '@lens-protocol/react';

import { Loading } from '../../components/loading/Loading';
import { ProfileCard } from './ProfileCard';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

type ProfileFollowersProps = {
  profileId: string;
};

export function ProfileFollowers({ profileId }: ProfileFollowersProps) {
  const {
    data: followers,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useProfileFollowers({ profileId }));

  if (loading) return <Loading />;

  return (
    <div>
      <h3>Followers</h3>
      <div>
        {followers.map((follower) =>
          follower.wallet.defaultProfile ? (
            <ProfileCard key={follower.wallet.address} profile={follower.wallet.defaultProfile} />
          ) : (
            <div key={follower.wallet.address}>{follower.wallet.address}</div>
          ),
        )}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
