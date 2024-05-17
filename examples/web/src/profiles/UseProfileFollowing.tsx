import { profileId, useProfileFollowing } from '@lens-protocol/react-web';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseProfileFollowing() {
  const {
    data: profiles,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useProfileFollowing({
      for: profileId('0x0109'),
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>useProfileFollowing</code>
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
