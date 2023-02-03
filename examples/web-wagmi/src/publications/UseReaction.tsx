import {
  ProfileFragment,
  Publication,
  ReactionType,
  usePublication,
  useReaction,
} from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';

type ReactionButtonProps = {
  publication: Publication;
  profileId: string;
  reactionType: ReactionType;
};

function ReactionButton({ publication, profileId, reactionType }: ReactionButtonProps) {
  const { addReaction, removeReaction, hasReaction, isPending } = useReaction({
    profileId,
  });

  const hasReactionType = hasReaction({
    reactionType,
    publication,
  });

  const toggleReaction = async () => {
    if (hasReactionType) {
      await removeReaction({
        reactionType,
        publication,
      });
    } else {
      await addReaction({
        reactionType,
        publication,
      });
    }
  };

  return (
    <>
      <button onClick={toggleReaction} disabled={isPending}>
        <strong>{hasReactionType ? `Remove ${reactionType}` : `Add ${reactionType}`}</strong>
      </button>
    </>
  );
}

type ReactionInnerProps = {
  profile: ProfileFragment;
};

function ReactionInner({ profile }: ReactionInnerProps) {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({
    publicationId: '0x1b-0x0118',
    observerId: profile.id, // important!
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <PublicationCard publication={publication} />
      <div>Total Upvotes: {publication.stats.totalUpvotes}</div>
      <div>
        <ReactionButton
          publication={publication}
          profileId={profile.id}
          reactionType={ReactionType.UPVOTE}
        />
      </div>
    </div>
  );
}

export function UseReaction() {
  return (
    <>
      <h1>
        <code>useReaction</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <ReactionInner profile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to react to a publication" />
    </>
  );
}
