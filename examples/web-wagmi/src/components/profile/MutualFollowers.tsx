import {
  ProfileFieldsFragment,
  useActiveProfile,
  useMutualFollowers,
  useProfilesToFollow,
} from '@lens-protocol/react';
import { useState } from 'react';

import { SmallProfileCard } from './ProfileCard';

type ViewMutualFollowersProps = {
  activeProfile: ProfileFieldsFragment;
  profileToCompare: ProfileFieldsFragment;
};

function ViewMutualFollowers({ activeProfile, profileToCompare }: ViewMutualFollowersProps) {
  const { data, loading } = useMutualFollowers({
    observerId: activeProfile.id,
    viewingProfileId: profileToCompare.id,
  });

  if (loading) return <p>Loading mutual followers</p>;

  return (
    <article>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <SmallProfileCard profile={activeProfile} />
        <SmallProfileCard profile={profileToCompare} />
      </div>
      <p>Mutual followers: {data?.length}</p>
    </article>
  );
}

export function MutualFollowers() {
  const { data, loading } = useProfilesToFollow();
  const { data: activeProfile, loading: profileLoading } = useActiveProfile();
  const [selectedProfile, setSelectedProfile] = useState<ProfileFieldsFragment | null>(null);

  if (loading || profileLoading) return <p>Loading...</p>;

  if (!activeProfile) return <p>No logged in</p>;

  return (
    <div>
      <h2>Mutual Followers</h2>

      {!selectedProfile ? (
        <>
          <p>Select a profile to see your mutual followers:</p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {data.map((profile) => (
              <button key={profile.id} onClick={() => setSelectedProfile(profile)}>
                <SmallProfileCard profile={profile} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedProfile(null)}>Back</button>
          <ViewMutualFollowers activeProfile={activeProfile} profileToCompare={selectedProfile} />
        </>
      )}
    </div>
  );
}
