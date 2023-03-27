import { useMutualFollowers, useProfile, Profile, ProfileId } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { SmallProfileCard } from './components/ProfileCard';
import { ProfileSelector } from './components/ProfileSelector';

type ViewMutualFollowersProps = {
  profileToCompareOne: ProfileId;
  profileToCompareTwo: ProfileId;
};

function ViewMutualFollowers({
  profileToCompareOne,
  profileToCompareTwo,
}: ViewMutualFollowersProps) {
  const {
    data: profileOne,
    error: errorOne,
    loading: profileOneLoading,
  } = useProfile({
    profileId: profileToCompareOne,
  });
  const {
    data: profileTwo,
    error: errorTwo,
    loading: profileTwoLoading,
  } = useProfile({
    profileId: profileToCompareTwo,
  });
  const { data, loading } = useMutualFollowers({
    observerId: profileToCompareOne,
    viewingProfileId: profileToCompareTwo,
  });

  if (loading || profileOneLoading || profileTwoLoading) return <p>Loading mutual followers...</p>;

  if (errorOne) return <ErrorMessage error={errorOne} />;
  if (errorTwo) return <ErrorMessage error={errorTwo} />;

  return (
    <article>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <SmallProfileCard profile={profileOne} />
        <SmallProfileCard profile={profileTwo} />
      </div>
      <p>Mutual followers: {data?.length}</p>
    </article>
  );
}

export function UseMutualFollowers() {
  const [selectedProfileOne, setSelectedProfileOne] = useState<Profile | null>(null);
  const [selectedProfileTwo, setSelectedProfileTwo] = useState<Profile | null>(null);

  return (
    <div>
      <h1>
        <code>useMutualFollowers</code>
      </h1>

      <article>
        <p>Select two profiles to see their mutual followers:</p>
        <ProfileSelector onProfileSelected={(p) => setSelectedProfileOne(p)} />
        <ProfileSelector onProfileSelected={(p) => setSelectedProfileTwo(p)} />
      </article>

      {selectedProfileOne && selectedProfileTwo && (
        <ViewMutualFollowers
          profileToCompareOne={selectedProfileOne.id}
          profileToCompareTwo={selectedProfileTwo.id}
        />
      )}
    </div>
  );
}
