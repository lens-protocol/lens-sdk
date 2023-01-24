import { useMutualFollowers, useProfile, ProfileFragment } from '@lens-protocol/react';
import { useState } from 'react';

import { SmallProfileCard } from './components/ProfileCard';
import { SelectProfile } from './components/ProfileSelector';

type ViewMutualFollowersProps = {
  profileToCompareOne: string;
  profileToCompareTwo: string;
};

function ViewMutualFollowers({
  profileToCompareOne,
  profileToCompareTwo,
}: ViewMutualFollowersProps) {
  const { data: profileOne, loading: profileOneLoading } = useProfile({
    profileId: profileToCompareOne,
  });
  const { data: profileTwo, loading: profileTwoLoading } = useProfile({
    profileId: profileToCompareTwo,
  });
  const { data, loading } = useMutualFollowers({
    observerId: profileToCompareOne,
    viewingProfileId: profileToCompareTwo,
  });

  if (loading || profileOneLoading || profileTwoLoading) return <p>Loading mutual followers...</p>;

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
  const [selectedProfileOne, setSelectedProfileOne] = useState<ProfileFragment | null>(null);
  const [selectedProfileTwo, setSelectedProfileTwo] = useState<ProfileFragment | null>(null);

  return (
    <div>
      <h1>
        <code>useMutualFollowers</code>
      </h1>

      <article>
        <p>Select two profiles to see their mutual followers:</p>
        <SelectProfile onProfileSelected={(profile) => setSelectedProfileOne(profile)} />
        <SelectProfile onProfileSelected={(profile) => setSelectedProfileTwo(profile)} />
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
