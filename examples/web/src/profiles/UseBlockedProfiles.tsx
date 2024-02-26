import { useBlockedProfiles } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

function UseBlockedProfilesInner() {
  const {
    data: profiles,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useBlockedProfiles());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (profiles.length === 0) return <p>No profiles blocked.</p>;

  return (
    <div>
      {profiles.map((p) => (
        <ProfileCard key={p.id} profile={p} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseBlockedProfiles() {
  return (
    <div>
      <h1>
        <code>useBlockedProfiles</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <UseBlockedProfilesInner />
      </RequireProfileSession>
    </div>
  );
}
