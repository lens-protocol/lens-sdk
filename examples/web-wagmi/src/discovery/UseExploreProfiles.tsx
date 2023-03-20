import { ProfileSortCriteria, useExploreProfiles } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

export function UseExploreProfiles() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useExploreProfiles({
      sortCriteria: ProfileSortCriteria.MostFollowers,
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
