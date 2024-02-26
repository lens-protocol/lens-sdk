import {
  useBookmarkToggle,
  useBookmarks,
  AnyPublication,
  isPrimaryPublication,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { invariant } from '../utils';

function PublicationWithActions({ publication }: { publication: AnyPublication }) {
  const { execute: toggle, loading } = useBookmarkToggle();

  invariant(isPrimaryPublication(publication), 'Publication is not a primary publication');

  return (
    <PublicationCard publication={publication}>
      <label>
        Bookmarked{' '}
        <input
          disabled={loading}
          type="checkbox"
          checked={publication.operations?.hasBookmarked}
          onChange={() => toggle({ publication })}
        />
      </label>
    </PublicationCard>
  );
}

function BookmarksInner() {
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
        <PublicationWithActions key={publication.id} publication={publication} />
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
        <BookmarksInner />
      </RequireProfileSession>
    </div>
  );
}
