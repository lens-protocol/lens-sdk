import { useCollectedPublications } from '@lens-protocol/react';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

export function UseCollectedPublications() {
  const walletAddress = '0x42a578e3557f5854B27D48E7d753fEb2f428546D';
  const {
    loading,
    data: publications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useCollectedPublications({ walletAddress }));

  if (loading) return <div>Loading...</div>;

  if (publications.length === 0) {
    return <p>No publications collected</p>;
  }

  return (
    <div>
      <h1>
        <code>useCollectedPublications</code>
      </h1>
      <p>Publications collected by {walletAddress}</p>
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
