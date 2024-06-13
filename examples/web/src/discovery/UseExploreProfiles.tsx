import { useExploreProfiles, ExploreProfilesOrderByType } from '@lens-protocol/react-web';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

export function UseExploreProfiles() {
  const { data, hasMore, observeRef } = useInfiniteScroll(
    useExploreProfiles({
      orderBy: ExploreProfilesOrderByType.LatestCreated,
      suspense: true,
    }),
  );

  if (data.length === 0) return <p>No items</p>;

  return (
    <div>
      <>
        <h1>
          <code>useExploreProfiles</code>
        </h1>

        {data.map((item) => (
          <ProfileCard key={item.id} profile={item} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
