import { profileId, useProfiles } from '@lens-protocol/react-web';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseProfiles() {
  const {
    data: profiles,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useProfiles({
      where: {
        profileIds: [profileId('0x01'), profileId('0x02'), profileId('0x03'), profileId('0x04')],
      },
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>useProfiles</code>
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
