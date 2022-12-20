import { useExploreProfiles } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from './ProfilePicture';

export function ExploreProfiles() {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(useExploreProfiles());

  if (loading) return <Loading />;

  if (data.length === 0) return <p>No items</p>;

  return (
    <div>
      <>
        <h1>Explore Profiles</h1>

        {data.map((item) => (
          <>
            <div key={item.id} style={{ margin: '1rem' }}>
              <ProfilePicture picture={item.picture} />
              <p>{item.handle}</p>
            </div>
            <hr />
          </>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
