import {
  ProfileFieldsFragment,
  ReactionType,
  ReactionTypes,
  usePublication,
  useReaction,
} from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';

type ReactionInnerProps = {
  profile: ProfileFieldsFragment;
};

function ReactionInner({ profile }: ReactionInnerProps) {
  const { data: publication, loading: publicationLoading } = usePublication({
    publicationId: '0x1b-0x0118',
    observerId: profile.id,
  });
  const { addReaction, removeReaction, isPending, error } = useReaction({
    profileId: profile.id,
  });

  const toggleReaction = async () => {
    if (!publication) return;

    if (publication.reaction === ReactionTypes.Upvote) {
      await removeReaction({
        reactionType: ReactionType.UPVOTE, // TODO normalize
        publicationId: publication.id,
      });
    } else {
      await addReaction({
        reactionType: ReactionType.UPVOTE,
        publicationId: publication.id,
      });
    }
  };

  if (publicationLoading) return <Loading />;

  const hasUpvote = publication.reaction === ReactionTypes.Upvote;

  return (
    <div>
      <PublicationCard publication={publication} />
      <div>Total Upvotes: {publication.stats.totalUpvotes}</div>
      <div>
        {error && <p>{error.message}</p>}
        <button onClick={toggleReaction} disabled={isPending}>
          <strong>{hasUpvote ? 'Remove Upvote' : 'Add Upvote'}</strong>
        </button>
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
      <WhenLoggedIn>{({ profile }) => <ReactionInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
