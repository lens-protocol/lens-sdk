import { useExploreProfiles } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';

export function ExploreProfiles() {
  const infiniteScroll = useInfiniteScroll(useExploreProfiles({}));

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  const hasMoreItems = infiniteScroll.nextCursor !== null;

  return (
    <div>
      <>
        <h1>Explore Profiles</h1>

        {infiniteScroll.data.map((item) => (
          <p key={item.id} style={{ margin: '10rem' }}>
            {item.handle}
          </p>
        ))}

        {hasMoreItems && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
