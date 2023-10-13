import {
  PrimaryPublication,
  PublicationReactionType,
  hasReacted,
  isPrimaryPublication,
  publicationId,
  usePublication,
  useReactionToggle,
} from '@lens-protocol/react-web';

import { WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant } from '../utils';
import { PublicationCard } from './components/PublicationCard';

type ReactionButtonProps = {
  publication: PrimaryPublication;
  reaction: PublicationReactionType;
};

function ReactionButton({ publication, reaction }: ReactionButtonProps) {
  const { execute: toggle, loading } = useReactionToggle({
    publication,
  });

  const hasReactionType = hasReacted({ publication, reaction });

  const toggleReaction = async () => {
    await toggle({
      reaction,
    });
  };

  return (
    <button onClick={toggleReaction} disabled={loading}>
      <strong>{hasReactionType ? `Remove ${reaction}` : `Add ${reaction}`}</strong>
    </button>
  );
}

function UseReactionToggleInner() {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({ forId: publicationId('0x04-0x0b') });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  invariant(isPrimaryPublication(publication), 'Publication is not a primary publication');

  return (
    <div>
      <PublicationCard publication={publication} />

      <div>Total Upvotes: {publication.stats.upvotes}</div>
      <div>Total Downvotes: {publication.stats.downvotes}</div>

      <div>
        <ReactionButton publication={publication} reaction={PublicationReactionType.Upvote} />
        <ReactionButton publication={publication} reaction={PublicationReactionType.Downvote} />
      </div>
    </div>
  );
}

export function UseReactionToggle() {
  return (
    <div>
      <h1>
        <code>useReactionToggle</code>
      </h1>

      <WhenLoggedIn>
        <UseReactionToggleInner />
      </WhenLoggedIn>
      <WhenLoggedOut>
        <p>You must be logged in to use this example.</p>
      </WhenLoggedOut>
    </div>
  );
}
