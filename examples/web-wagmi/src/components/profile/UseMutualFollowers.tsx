import { useMutualFollowers, useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { SelectProfileId } from '../ProfileSelector';
import { SmallProfileCard } from './ProfileCard';

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
  const [selectedProfileOne, setSelectedProfileOne] = useState<string | null>(null);
  const [selectedProfileTwo, setSelectedProfileTwo] = useState<string | null>(null);

  return (
    <div>
      <h1>
        <code>useMutualFollowers</code>
      </h1>

      <article>
        <p>Select two profiles to see their mutual followers:</p>
        <SelectProfileId onProfileSelected={(profile) => setSelectedProfileOne(profile)} />
        <SelectProfileId onProfileSelected={(profile) => setSelectedProfileTwo(profile)} />
      </article>

      {selectedProfileOne && selectedProfileTwo && (
        <ViewMutualFollowers
          profileToCompareOne={selectedProfileOne}
          profileToCompareTwo={selectedProfileTwo}
        />
      )}
    </div>
  );
}
