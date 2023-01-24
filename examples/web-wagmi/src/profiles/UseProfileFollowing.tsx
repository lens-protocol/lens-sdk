import { useState } from 'react';

import { ProfileFollowers } from './components/ProfileFollowers';
import { SelectProfileId } from './components/ProfileSelector';
import { ProfilesFollowing } from './components/ProfileFollowing';

export function UseProfileFollowers() {
  const [profileId, setProfileId] = useState<string | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <SelectProfileId onProfileSelected={(h: string) => setProfileId(h)} />
      {/*{profileId && <ProfilesFollowing walletAddress={profile.ownedBy} />}*/}
    </>
  );
}
