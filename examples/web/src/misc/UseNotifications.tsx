import { useNotifications } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { NotificationItem } from './components/NotificationItem';

function UseNotificationsInner() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(useNotifications());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseNotifications() {
  return (
    <div>
      <h1>
        <code>useNotifications</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <UseNotificationsInner />
      </RequireProfileSession>
    </div>
  );
}
