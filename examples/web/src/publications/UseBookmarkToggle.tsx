import {
  Comment,
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  Post,
  useBookmarkToggle,
  useExplorePublications,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function IndividualPublication({ publication }: { publication: Post | Comment }) {
  const { execute: toggle, loading } = useBookmarkToggle();
  return (
    <PublicationCard publication={publication}>
      <label>
        Bookmarked{' '}
        <input
          disabled={loading}
          type="checkbox"
          checked={publication.operations.hasBookmarked}
          onChange={() => toggle({ publication })}
        />
      </label>
    </PublicationCard>
  );
}

function UseBookmarkToggleInner() {
  const {
    data: publications,
    error,
    loading,
  } = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.TopMirrored,
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {publications.map((publication) => (
        <IndividualPublication key={publication.id} publication={publication as Post | Comment} />
      ))}
    </div>
  );
}

export function UseBookmarkToggle() {
  return (
    <>
      <h1>
        <code>useBookmarkToggle</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        <UseBookmarkToggleInner />
      </RequireProfileSession>
    </>
  );
}
