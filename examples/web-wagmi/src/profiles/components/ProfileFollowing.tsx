import { useProfileFollowing } from '@lens-protocol/react-web';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { Loading } from '../../components/loading/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { ProfileCard } from './ProfileCard';

type ProfileFollowingProps = {
  walletAddress: string;
};

export function ProfilesFollowing({ walletAddress }: ProfileFollowingProps) {
  const {
    data: followings,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useProfileFollowing({ walletAddress }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h3>Following</h3>
      <div>
        {followings.map((following) => (
          <ProfileCard key={following.profile.handle} profile={following.profile} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
