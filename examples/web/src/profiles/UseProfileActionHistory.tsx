import { useProfileActionHistory } from '@lens-protocol/react-web';

import { WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function UseProfileActionHistoryInner() {
  const {
    data: history,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useProfileActionHistory());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {history.map((item) => (
        <div key={item.id}>
          {item.actionType} {item.actionedOn}
        </div>
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseProfileActionHistory() {
  return (
    <div>
      <h1>
        <code>useProfileActionHistory</code>
      </h1>

      <WhenLoggedIn>
        <UseProfileActionHistoryInner />
      </WhenLoggedIn>
      <WhenLoggedOut>
        <p>You must be logged in to use this example.</p>
      </WhenLoggedOut>
    </div>
  );
}
