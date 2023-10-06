import { profileId, useRecommendedProfiles } from '@lens-protocol/react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseRecommendedProfiles() {
  const {
    data: profiles,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useRecommendedProfiles({
      for: profileId('0x04'),
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useRecommendedProfiles</code>
      </h1>
      <div>
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
