import { profileId, useRevenueFromFollow } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { RevenueCard } from './components/RevenueCard';

export function UseRevenueFromFollow() {
  const { data, loading, error } = useRevenueFromFollow({
    for: profileId('0x04'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <h1>
        <code>useRevenueFromFollow</code>
      </h1>

      <div>
        <h3>Follow revenue</h3>
        {data.length ? (
          data.map((revenue, index) => <RevenueCard key={index} revenue={revenue} />)
        ) : (
          <p>No revenue.</p>
        )}
      </div>
    </>
  );
}
