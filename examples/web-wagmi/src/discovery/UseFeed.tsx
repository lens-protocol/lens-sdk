import { isPostPublication, useFeed } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { CreatePost } from '../publications/components/CreatePost';
import { PublicationCard } from '../publications/components/PublicationCard';

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
      <h1>
        <code>useFeed</code>
      </h1>

      <CreatePost />

      {infiniteScroll.data
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
        ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
