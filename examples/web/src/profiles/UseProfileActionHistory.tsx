import { useProfileActionHistory } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

// TODO requires authenticated profile
export function UseProfileActionHistory() {
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
      <h1>
        <code>useProfileActionHistory</code>
      </h1>
      <div>
        {history.map((item) => (
          <div key={item.id}>
            {item.actionType} {item.actionedOn}
          </div>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
