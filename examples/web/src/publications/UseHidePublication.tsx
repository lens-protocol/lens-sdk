import {
  AnyPublication,
  EvmAddress,
  Profile,
  PublicationType,
  useHidePublication,
  usePublications,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

type HidePublicationButtonProps = {
  publication: AnyPublication;
};

function HidePublicationButton({ publication }: HidePublicationButtonProps) {
  const { execute: hide, loading } = useHidePublication();

  if (publication.isHidden) return <p>Publication is hidden</p>;

  return (
    <button onClick={() => hide({ publication })} disabled={loading}>
      Hide
    </button>
  );
}

function FeedItem({ publication, address }: { publication: AnyPublication; address: EvmAddress }) {
  return (
    <section>
      <PublicationCard publication={publication} />

      {publication.by.ownedBy.address === address ? (
        <HidePublicationButton publication={publication} />
      ) : (
        "Can't hide publication that's not owned by you"
      )}
    </section>
  );
}

type FeedProps = {
  profile: Profile;
  address: EvmAddress;
};

function Feed({ profile, address }: FeedProps) {
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
        from: [profile.id],
      },
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (publications.length === 0) return <p>No items</p>;

  return (
    <>
      {publications.map((publication) => (
        <FeedItem key={publication.id} publication={publication} address={address} />
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
      <RequireProfileSession message="Log in to view this example.">
        {({ profile, address }) => <Feed profile={profile} address={address} />}
      </RequireProfileSession>
    </>
  );
}
