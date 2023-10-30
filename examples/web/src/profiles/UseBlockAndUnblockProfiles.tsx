import {
  ExploreProfilesOrderByType,
  Profile,
  useBlockProfiles,
  useExploreProfiles,
  useUnblockProfiles,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function BlockOrUnblockProfileCard({ profile }: { profile: Profile }) {
  const { execute: block, loading: blockLoading, error: blockError } = useBlockProfiles();
  const { execute: unblock, loading: unblockLoading, error: unblockError } = useUnblockProfiles();

  if (profile.operations.canUnblock === true || profile.operations.isBlockedByMe.value === true) {
    return (
      <ProfileCard profile={profile}>
        <button
          onClick={() => {
            if (profile.operations.isBlockedByMe.isFinalisedOnchain === false) {
              alert(
                'You cannot unblock this profile until the pending block operation is finalised onchain',
              );
              return;
            }
            return unblock({ profiles: [profile] });
          }}
          disabled={unblockLoading}
        >
          Unblock
        </button>
        {unblockError && <p>Error unblocking profile: {unblockError.message}</p>}
      </ProfileCard>
    );
  }

  if (profile.operations.canBlock === true || profile.operations.isBlockedByMe.value === false) {
    return (
      <ProfileCard profile={profile}>
        <button
          onClick={() => {
            if (profile.operations.isBlockedByMe.isFinalisedOnchain === false) {
              alert(
                'You cannot block this profile until the pending unblock operation is finalised onchain',
              );
              return;
            }
            return block({ profiles: [profile] });
          }}
          disabled={blockLoading}
        >
          Block
        </button>
        {blockError && <p>Error blocking profile: {blockError.message}</p>}
      </ProfileCard>
    );
  }

  return null;
}

function UseBlockAndUnblockProfilesInner() {
  const {
    data: profiles,
    loading,
    error,
  } = useExploreProfiles({
    orderBy: ExploreProfilesOrderByType.LatestCreated,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {profiles.map((profile) => (
        <BlockOrUnblockProfileCard key={profile.id} profile={profile} />
      ))}
    </>
  );
}

export function UseBlockAndUnblockProfiles() {
  return (
    <>
      <WhenLoggedIn>
        <UseBlockAndUnblockProfilesInner />
      </WhenLoggedIn>
      <UnauthenticatedFallback message="Please login to unblock profiles" />
    </>
  );
}
