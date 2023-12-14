import { publicationId, useRevenueFromPublication } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationRevenueCard } from './components/PublicationRevenueCard';

export function UseRevenueFromPublication() {
  const { data, error, loading } = useRevenueFromPublication({
    for: publicationId('0x56-0x02'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useRevenueFromPublication</code>
      </h1>
      <PublicationRevenueCard publicationRevenue={data} />
    </div>
  );
}
