import { isPostPublication, useFeed } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { PublicationCard } from '../publication/PublicationCard';
import { CreatePost } from './CreatePost';

export function Feed() {
  const infiniteScroll = useInfiniteScroll(
    useFeed({
      profileId: '0x3a2a',
    }),
  );

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  return (
    <div>
      <CreatePost />

      <h2>Feed</h2>

      {infiniteScroll.data
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
        ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
