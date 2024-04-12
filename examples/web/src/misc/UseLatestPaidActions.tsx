import { useLatestPaidActions } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PaidActionItem } from './components/PaidActionItem';

function UseLatestPaidActionsInner() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(useLatestPaidActions());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.length === 0 && <p>No paid actions found.</p>}

      {data.map((item) => (
        <PaidActionItem key={item.latestActed[0].actedAt} action={item} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseLatestPaidActions() {
  return (
    <div>
      <h1>
        <code>useLatestPaidActions</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <UseLatestPaidActionsInner />
      </RequireProfileSession>
    </div>
  );
}
