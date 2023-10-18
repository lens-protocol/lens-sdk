import { useMyBookmarks } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn } from '../components/auth';
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
  } = useInfiniteScroll(useMyBookmarks());

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

export function UseMyBookmarks() {
  return (
    <div>
      <h1>
        <code>useMyBookmarks</code>
      </h1>

      <WhenLoggedIn>{() => <MyBookmarks />}</WhenLoggedIn>
      <UnauthenticatedFallback message="Log in to run this demo." />
    </div>
  );
}
