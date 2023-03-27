import { profileId, useProfilePublicationRevenue } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

export function UseProfilePublicationRevenue() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useProfilePublicationRevenue({
      profileId: profileId('0x15'),
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
