import { useExploreProfiles } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from './ProfilePicture';

export function ExploreProfiles() {
  const infiniteScroll = useInfiniteScroll(useExploreProfiles());

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  return (
    <div>
      <>
        <h1>Explore Profiles</h1>

        {infiniteScroll.data.map((item) => (
          <>
            <div key={item.id} style={{ margin: '1rem' }}>
              <ProfilePicture picture={item.picture} />
              <p>{item.handle}</p>
            </div>
            <hr />
          </>
        ))}

        {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
