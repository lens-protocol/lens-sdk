import { ProfileId, useProfileFollowers } from '@lens-protocol/react-web';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { Loading } from '../../components/loading/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { ProfileCard } from './ProfileCard';

type ProfileFollowersProps = {
  profileId: ProfileId;
};

export function ProfileFollowers({ profileId }: ProfileFollowersProps) {
  const {
    data: followers,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useProfileFollowers({ profileId }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
