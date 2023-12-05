import {
  ExploreProfilesOrderByType,
  Profile,
  useBlockProfiles,
  useExploreProfiles,
  useUnblockProfiles,
} from '@lens-protocol/react-web';
import { FormEvent } from 'react';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function BlockOrUnblockProfileCard({ profile }: { profile: Profile }) {
  const { execute: block, loading: blockLoading, error: blockError } = useBlockProfiles();
  const { execute: unblock, loading: unblockLoading, error: unblockError } = useUnblockProfiles();

  const handleBlockSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (profile.operations.isBlockedByMe.isFinalisedOnchain === false) {
      alert(
        'You cannot block this profile until the pending unblock operation is finalised onchain',
      );
      return;
    }
    await block({ profiles: [profile], sponsored: formData.get('sponsored') === 'on' });
  };

  const handleUnblockSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (profile.operations.isBlockedByMe.isFinalisedOnchain === false) {
      alert(
        'You cannot unblock this profile until the pending block operation is finalised onchain',
      );
      return;
    }
    await unblock({ profiles: [profile], sponsored: formData.get('sponsored') === 'on' });
  };

  if (profile.operations.canUnblock === true || profile.operations.isBlockedByMe.value === true) {
    return (
      <ProfileCard profile={profile}>
        <form onSubmit={handleUnblockSubmit}>
          <button type="submit" disabled={unblockLoading}>
            Unblock
          </button>
          <label>
            <input type="checkbox" name="sponsored" value="on" defaultChecked={true} />
            sponsored
          </label>
          {unblockError && <p>Error unblocking profile: {unblockError.message}</p>}
        </form>
      </ProfileCard>
    );
  }

  if (profile.operations.canBlock === true || profile.operations.isBlockedByMe.value === false) {
    return (
      <ProfileCard profile={profile}>
        <form onSubmit={handleBlockSubmit}>
          <button type="submit" disabled={blockLoading}>
            Block
          </button>
          <label>
            <input type="checkbox" name="sponsored" value="on" defaultChecked={true} />
            sponsored
          </label>
          {blockError && <p>Error blocking profile: {blockError.message}</p>}
        </form>
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
      <RequireProfileSession message="Please login to unblock profiles">
        <UseBlockAndUnblockProfilesInner />
      </RequireProfileSession>
    </>
  );
}
