import {
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  PrimaryPublication,
  useExplorePublications,
  useNotInterestedToggle,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function IndividualPublication({ publication }: { publication: PrimaryPublication }) {
  const { execute: toggle, loading } = useNotInterestedToggle();
  return (
    <PublicationCard publication={publication}>
      <label>
        Not interested{' '}
        <input
          disabled={loading}
          type="checkbox"
          checked={publication.operations.isNotInterested}
          onChange={() => toggle({ publication })}
        />
      </label>
    </PublicationCard>
  );
}

function UseNotInterestedToggleInner() {
  const {
    data: publications,
    error,
    loading,
  } = useExplorePublications({
    orderBy: ExplorePublicationsOrderByType.Latest,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useNotInterested</code>
      </h1>

      {publications.map((publication) => (
        <IndividualPublication key={publication.id} publication={publication} />
      ))}
    </div>
  );
}

export function UseNotInterestedToggle() {
  return (
    <RequireProfileSession message="Log in to view this example.">
      <UseNotInterestedToggleInner />
    </RequireProfileSession>
  );
}
