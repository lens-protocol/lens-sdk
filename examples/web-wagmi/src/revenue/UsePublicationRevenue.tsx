import { publicationId, usePublicationRevenue } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

export function UsePublicationRevenue() {
  const {
    data: publicationRevenue,
    error,
    loading,
  } = usePublicationRevenue({
    publicationId: publicationId('0x4f90-0x02'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>usePublicationRevenue</code>
      </h1>
      <PublicationRevenueCard publicationRevenue={publicationRevenue} />
    </div>
  );
}
