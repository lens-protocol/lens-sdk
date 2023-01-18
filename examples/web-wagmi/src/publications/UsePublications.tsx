import { usePublications } from '@lens-protocol/react';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

export function UsePublications() {
  const {
    data: publications,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(usePublications({ profileId: '0x1b' }));

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        <code>usePublications</code>
      </h1>
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
