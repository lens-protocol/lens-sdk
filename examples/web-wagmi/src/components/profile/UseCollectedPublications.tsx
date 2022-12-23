import { useCollectedPublications } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export function UseCollectedPublications() {
  const {
    loading,
    data: publications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useCollectedPublications({ walletAddress: '0x42a578e3557f5854B27D48E7d753fEb2f428546D' }),
  );

  if (loading) return <div>Loading...</div>;

  if (publications.length === 0) {
    return <p>No publications collected</p>;
  }

  return (
    <div>
      <h2>useCollectedPublications</h2>
      {publications.map((publication) => (
        <div key={publication.id}>
          <p>{publication.id}</p>
        </div>
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
