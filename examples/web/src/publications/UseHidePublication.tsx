import {
  AnyPublication,
  ProfileSession,
  PublicationType,
  useHidePublication,
  usePublications,
} from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

type HidePublicationButtonProps = {
  publication: AnyPublication;
};

function HidePublicationButton({ publication }: HidePublicationButtonProps) {
  const { execute: hide, isPending } = useHidePublication({ publication });

  if (publication.isHidden) return <p>Publication is hidden</p>;

  return (
    <button onClick={hide} disabled={isPending}>
      Hide
    </button>
  );
}

function FeedItem({
  publication,
  session,
}: {
  publication: AnyPublication;
  session: ProfileSession;
}) {
  return (
    <section>
      <PublicationCard publication={publication} />

      {publication.by.ownedBy.address === session.address ? (
        <HidePublicationButton publication={publication} />
      ) : (
        "Can't hide publication that's not owned by you"
      )}
    </section>
  );
}

type FeedProps = {
  session: ProfileSession;
};

function Feed({ session }: FeedProps) {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    usePublications({
      where: {
        publicationTypes: [PublicationType.Post],
        from: [session.profile.id],
      },
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (publications.length === 0) return <p>No items</p>;

  return (
    <>
      {publications.map((publication) => (
        <FeedItem key={publication.id} publication={publication} session={session} />
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
      <WhenLoggedIn>{({ session }) => <Feed session={session} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
