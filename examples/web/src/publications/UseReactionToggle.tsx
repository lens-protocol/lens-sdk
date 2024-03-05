import {
  AnyPublication,
  PrimaryPublication,
  PublicationReactionType,
  PublicationType,
  hasReacted,
  isPrimaryPublication,
  usePublications,
  useReactionToggle,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant } from '../utils';

type ReactionButtonProps = {
  publication: PrimaryPublication;
  reaction: PublicationReactionType;
};

function ReactionButton({ publication, reaction }: ReactionButtonProps) {
  const { execute: toggle, loading, error } = useReactionToggle();

  const hasReactionType = hasReacted({ publication, reaction });

  const toggleReaction = async () => {
    await toggle({
      reaction,
      publication,
    });
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <button onClick={toggleReaction} disabled={loading}>
      <strong>{hasReactionType ? `Remove ${reaction}` : `Add ${reaction}`}</strong>
    </button>
  );
}

function PublicationWithReactions({ publication }: { publication: AnyPublication }) {
  invariant(isPrimaryPublication(publication), 'Publication is not a primary publication');

  return (
    <PublicationCard publication={publication}>
      <div>Total Upvotes: {publication.stats.upvotes}</div>
      <div>Total Downvotes: {publication.stats.downvotes}</div>

      <div>
        <ReactionButton publication={publication} reaction={PublicationReactionType.Upvote} />
        <ReactionButton publication={publication} reaction={PublicationReactionType.Downvote} />
      </div>
    </PublicationCard>
  );
}

function UseReactionToggleInner() {
  const {
    data: publications,
    error,
    loading,
  } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
    },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {publications.map((publication) => (
        <PublicationWithReactions key={publication.id} publication={publication} />
      ))}
    </div>
  );
}

export function UseReactionToggle() {
  return (
    <div>
      <h1>
        <code>useReactionToggle</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <UseReactionToggleInner />
      </RequireProfileSession>
    </div>
  );
}
