import { useProfileFollowRevenue, usePublication } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { PublicationCard } from '../publications/components/PublicationCard';

const publicationId = '0x4f90-0x02';

export function UseProfileFollowRevenue() {
  const { data: publicationRevenue, loading: publicationRevenueLoading } = useProfileFollowRevenue({
    profileId: '0x4f90-0x01',
  });
  const { data: publication, loading: publicationLoading } = usePublication({ publicationId });

  if (publicationRevenueLoading || publicationLoading) return <Loading />;

  console.log({ publicationRevenue });

  return (
    <div>
      <h1>
        <code>useProfileFollowRevenue</code>
      </h1>
      <PublicationCard publication={publication} />
      <h3>Follow revenue</h3>
    </div>
  );
}
