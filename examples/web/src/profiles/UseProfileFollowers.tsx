import { profileId, useProfileFollowers } from '@lens-protocol/react-web';

import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseProfileFollowers() {
  const {
    data: profiles,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useProfileFollowers({
      of: profileId('0x07'),
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>useProfileFollowers</code>
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
