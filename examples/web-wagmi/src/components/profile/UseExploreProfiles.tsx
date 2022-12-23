import { useExploreProfiles } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

export function UseExploreProfiles() {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(useExploreProfiles());

  if (loading) return <Loading />;

  if (data.length === 0) return <p>No items</p>;

  return (
    <div>
      <>
        <h1>
          <code>useExploreProfiles</code>
        </h1>

        {data.map((item) => (
          <ProfileCard key={item.id} profile={item} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
