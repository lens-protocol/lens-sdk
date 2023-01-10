import { useFeed } from '@lens-protocol/react';

import { Loading } from '../../components/loading/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { PublicationCard } from './PublicationCard';

type MyFeedProps = {
  profileId: string;
};

export function MyFeed({ profileId }: MyFeedProps) {
  const infiniteScroll = useInfiniteScroll(useFeed({ profileId }));

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  return (
    <div>
      {infiniteScroll.data.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
