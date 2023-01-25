import { useWhoMirroredPublication } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

const publicationId = '0x1b-0x0118';

export function UseWhoMirroredPublication() {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(
    useWhoMirroredPublication({ publicationId }),
  );

  return (
    <div>
      <h1>
        <code>Profiles Who Mirrored Publication ({publicationId})</code>
      </h1>

      {loading && <Loading />}

      {!loading && (
        <>
          {data.length > 0 && (
            <div>
              {data.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}

              {hasMore && <p ref={observeRef}>Loading more...</p>}
            </div>
          )}

          {data.length === 0 && <p>No profiles found</p>}
        </>
      )}
    </div>
  );
}
