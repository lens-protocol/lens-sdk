import { useComments } from '@lens-protocol/react';

import { Loading } from '../../components/loading/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { PublicationCard } from './PublicationCard';

type PublicationCommentsProps = {
  publicationId: string;
};

export function PublicationComments({ publicationId }: PublicationCommentsProps) {
  const infiniteScroll = useInfiniteScroll(useComments({ commentsOf: publicationId }));

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  return (
    <div>
      {infiniteScroll.data.map((item, i) => (
        <PublicationCard key={`${item.id}-${i}`} publication={item} />
      ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
