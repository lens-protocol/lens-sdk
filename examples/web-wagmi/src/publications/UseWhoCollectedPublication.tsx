import { publicationId, PublicationId, useWhoCollectedPublication } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

type UseWhoCollectedPublicationLayoutProps = {
  publicationId: PublicationId;
};

function UseWhoCollectedPublicationLayout(props: UseWhoCollectedPublicationLayoutProps) {
  const {
    data: whoCollected,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useWhoCollectedPublication({ publicationId: props.publicationId }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useWhoCollectedPublication</code>
      </h1>

      {whoCollected.map((wallet) => {
        if (!wallet.defaultProfile) {
          return null;
        }

        return <ProfileCard key={wallet.address} profile={wallet.defaultProfile} />;
      })}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseWhoCollectedPublication() {
  // TODO: use the useExplorePublications hook to get a list of publications to select an id from
  return <UseWhoCollectedPublicationLayout publicationId={publicationId('0x02-0x19')} />;
}
