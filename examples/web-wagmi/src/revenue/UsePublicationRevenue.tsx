import { usePublication, usePublicationRevenue } from '@lens-protocol/react';

import { RevenueCard } from './components/RevenueCard';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from '../publications/components/PublicationCard';

const publicationId = '0x4f90-0x02';

export function UsePublicationRevenue() {
  const {
    data: publicationRevenue,
    error: revenueError,
    loading: publicationRevenueLoading,
  } = usePublicationRevenue({
    publicationId,
  });
  const {
    data: publication,
    error: publicationError,
    loading: publicationLoading,
  } = usePublication({ publicationId });

  if (publicationRevenueLoading || publicationLoading) return <Loading />;

  if (revenueError) return <ErrorMessage error={revenueError} />;
  if (publicationError) return <ErrorMessage error={publicationError} />;

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
