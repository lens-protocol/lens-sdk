import { useProfilePublicationRevenue } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

const profileId = '0x4f90-0x02';

export function UseProfilePublicationRevenue() {
  const { data, loading } = useProfilePublicationRevenue({
    profileId,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>
        <code>useProfilePublicationRevenue</code>
      </h1>

      <h3>Profile Publication Revenue</h3>

      {data.map((publicationRevenue) => {
        return (
          <PublicationRevenueCard
            key={publicationRevenue.publication.id}
            publicationRevenue={publicationRevenue}
          />
        );
      })}
    </div>
  );
}
