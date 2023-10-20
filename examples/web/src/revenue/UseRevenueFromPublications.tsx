import { profileId, useRevenueFromPublications } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

export function UseRevenueFromPublications() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useRevenueFromPublications({
      for: profileId('0x04'),
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useRevenueFromPublications</code>
      </h1>

      {data.map((publicationRevenue) => {
        return (
          <PublicationRevenueCard
            key={publicationRevenue.publication.id}
            publicationRevenue={publicationRevenue}
          />
        );
      })}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
