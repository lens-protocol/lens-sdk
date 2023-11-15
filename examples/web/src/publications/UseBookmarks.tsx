import { useBookmarks } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

export function MyBookmarks() {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useBookmarks());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (publications.length === 0) return <p>No bookmarks yet.</p>;

  return (
    <div>
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseBookmarks() {
  return (
    <div>
      <h1>
        <code>useBookmarks</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {() => <MyBookmarks />}
      </RequireProfileSession>
    </div>
  );
}
