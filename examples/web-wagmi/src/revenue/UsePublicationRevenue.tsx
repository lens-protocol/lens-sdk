import { usePublication, usePublicationRevenue } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { PublicationCard } from '../publications/components/PublicationCard';
import { RevenueCard } from './components/RevenueCard';

const publicationId = '0x4f90-0x02';

export function UsePublicationRevenue() {
  const { data: publicationRevenue, loading: publicationRevenueLoading } = usePublicationRevenue({
    publicationId,
  });
  const { data: publication, loading: publicationLoading } = usePublication({ publicationId });

  if (publicationRevenueLoading || publicationLoading) return <Loading />;

  return (
    <div>
      <h1>
        <code>usePublicationRevenue</code>
      </h1>
      <PublicationCard publication={publication} />
      <h2>Revenue</h2>
      <RevenueCard revenue={publicationRevenue} />
    </div>
  );
}
