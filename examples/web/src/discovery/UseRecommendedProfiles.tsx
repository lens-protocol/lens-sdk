import {
  ProfileId,
  useDismissRecommendedProfiles,
  useRecommendedProfiles,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

function UseRecommendedProfilesInner({ profileId }: { profileId: ProfileId }) {
  const {
    data: profiles,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useRecommendedProfiles({
      for: profileId,
    }),
  );

  const { execute: dismiss, loading: dismissing } = useDismissRecommendedProfiles();

  const dismissRecommendation = (id: ProfileId) => {
    void dismiss({ profileIds: [id] });
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {profiles.map((p) => (
        <div key={p.id}>
          <ProfileCard profile={p}>
            <button onClick={() => dismissRecommendation(p.id)} disabled={dismissing}>
              Dismiss recommendation
            </button>
          </ProfileCard>
        </div>
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseRecommendedProfiles() {
  return (
    <div>
      <h2>
        <code>useRecommendedProfiles & useDismissRecommendedProfiles</code>
      </h2>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseRecommendedProfilesInner profileId={profile.id} />}
      </RequireProfileSession>
    </div>
  );
}
