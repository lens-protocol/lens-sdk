import {
  ProfileId,
  useDismissRecommendedProfiles,
  useRecommendedProfiles,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

function UseRecommendedProfilesInner({ profileId }: { profileId: ProfileId }) {
  const {
    data: profiles,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useRecommendedProfiles({
      for: profileId,
      suspense: true,
    }),
  );

  const { execute: dismiss, loading: dismissing } = useDismissRecommendedProfiles();

  const dismissRecommendation = (id: ProfileId) => {
    void dismiss({ profileIds: [id] });
  };

  return (
    <div>
      <h2>
        <code>useRecommendedProfiles</code>
      </h2>
      <div>
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p}>
            <button onClick={() => dismissRecommendation(p.id)} disabled={dismissing}>
              Dismiss recommendation
            </button>
          </ProfileCard>
        ))}
      </div>

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseRecommendedProfiles() {
  return (
    <RequireProfileSession message="Log in to view this example.">
      {({ profile }) => <UseRecommendedProfilesInner profileId={profile.id} />}
    </RequireProfileSession>
  );
}
