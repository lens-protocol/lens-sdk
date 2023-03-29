import {
  Profile,
  ContentPublication,
  ReactionType,
  usePublication,
  useReaction,
  isMirrorPublication,
  ProfileId,
  publicationId,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant } from '../utils';
import { PublicationCard } from './components/PublicationCard';

type ReactionButtonProps = {
  publication: ContentPublication;
  profileId: ProfileId;
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
  profile: Profile;
};

function ReactionInner({ profile }: ReactionInnerProps) {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({
    publicationId: publicationId('0x1b-0x0118'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  invariant(!isMirrorPublication(publication), 'Publication is not a post or comment');

  return (
    <div>
      <PublicationCard publication={publication} />

      <div>Total Upvotes: {publication.stats.totalUpvotes}</div>
      <div>Total Upvotes: {publication.stats.totalDownvotes}</div>

      <div>
        <ReactionButton
          publication={publication}
          profileId={profile.id}
          reactionType={ReactionType.UPVOTE}
        />

        <ReactionButton
          publication={publication}
          profileId={profile.id}
          reactionType={ReactionType.DOWNVOTE}
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
