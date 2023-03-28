import {
  useHidePublication,
  isPublicationOwnedByMe,
  PublicationOwnedByMe,
  usePublications,
  ProfileOwnedByMe,
  AnyPublication,
} from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

type HidePublicationButtonProps = {
  publication: PublicationOwnedByMe;
};

function HidePublicationButton({ publication }: HidePublicationButtonProps) {
  const { execute: hide, isPending } = useHidePublication({ publication });

  if (publication.hidden) return null;

  return (
    <button onClick={hide} disabled={isPending}>
      Hide
    </button>
  );
}

function FeedItem({ publication }: { publication: AnyPublication }) {
  return (
    <section>
      <PublicationCard publication={publication} />

      {isPublicationOwnedByMe(publication) ? (
        <HidePublicationButton publication={publication} />
      ) : (
        "Can't hide publication that's not owned by you"
      )}
    </section>
  );
}

type FeedProps = {
  activeProfile: ProfileOwnedByMe;
};

function Feed({ activeProfile }: FeedProps) {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(usePublications({ profileId: activeProfile.id }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (publications.length === 0) return <p>No items</p>;

  return (
    <>
      {publications.map((publication) => (
        <FeedItem key={publication.id} publication={publication} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </>
  );
}

export function UseHidePublication() {
  return (
    <>
      <h1>
        <code>useHidePublication</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <Feed activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
