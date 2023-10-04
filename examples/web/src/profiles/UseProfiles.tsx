import { profileId, useProfiles } from '@lens-protocol/react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseProfiles() {
  const {
    data: profiles,
    beforeCount,
    error,
    loading,
    hasMore,
    prev,
    observeRef,
  } = useInfiniteScroll(
    useProfiles({
      where: {
        profileIds: [profileId('0x01'), profileId('0x02'), profileId('0x03'), profileId('0x04')],
      },
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useProfiles</code>
      </h1>
      <div>
        {beforeCount > 0 && (
          <button disabled={loading} onClick={prev}>
            Fetch newer
          </button>
        )}
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
