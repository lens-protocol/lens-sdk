import { useProfilePublicationRevenue } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

const profileId = '0x15';

export function UseProfilePublicationRevenue() {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(
    useProfilePublicationRevenue({
      profileId,
    }),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>
        <code>useProfilePublicationRevenue</code>
      </h1>

      <h2>Profile Publication Revenue</h2>

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
