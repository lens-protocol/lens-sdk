import { useExploreProfiles } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from './ProfilePicture';

export function ExploreProfiles() {
  const exploreProfiles = useExploreProfiles({});

  const infiniteScroll = useInfiniteScroll(exploreProfiles);

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  const hasMoreItems = infiniteScroll.nextCursor !== null;

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

        {hasMoreItems && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
