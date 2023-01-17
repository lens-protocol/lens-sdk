import { useWhoCollectedPublication } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

type UseWhoCollectedPublicationLayoutProps = {
  publicationId: string;
};

function UseWhoCollectedPublicationLayout({
  publicationId,
}: UseWhoCollectedPublicationLayoutProps) {
  const {
    data: whoCollected,
    loading: whoCollectedLoading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useWhoCollectedPublication({ publicationId }));

  if (whoCollectedLoading) return <Loading />;

  return (
    <div>
      <h1>
        <code>useWhoCollectedPublication</code>
      </h1>

      {whoCollected.map((wallet) => {
        return <ProfileCard key={wallet.address} profile={wallet.defaultProfile} />;
      })}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseWhoCollectedPublication() {
  // TODO: use the useExplorePublications hook to get a list of publications to select an id from
  return <UseWhoCollectedPublicationLayout publicationId="0x02-0x19" />;
}
