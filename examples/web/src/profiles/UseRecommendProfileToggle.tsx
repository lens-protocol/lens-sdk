import { Profile, useExploreProfiles, useRecommendProfileToggle } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function ProfileRecommendation({ profile }: { profile: Profile }) {
  const { execute: toggle, loading } = useRecommendProfileToggle();

  return (
    <ProfileCard profile={profile}>
      <button onClick={() => toggle({ profile })} disabled={loading}>
        {profile.peerToPeerRecommendedByMe ? `Remove recommendation` : `Recommend`}
      </button>
    </ProfileCard>
  );
}

function UseRecommendProfileToggleInner() {
  const { data: profiles, error, loading } = useExploreProfiles();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {profiles.map((profile) => (
        <ProfileRecommendation key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

export function UseRecommendProfileToggle() {
  return (
    <div>
      <h1>
        <code>useRecommendProfileToggle</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <UseRecommendProfileToggleInner />
      </RequireProfileSession>
    </div>
  );
}
