import { useState } from 'react';

import { ProfileFollowers } from './components/ProfileFollowers';
import { SelectProfileId } from './components/ProfileSelector';

export function UseProfileFollowers() {
  const [profileId, setProfileId] = useState<string | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <SelectProfileId onProfileSelected={(h: string) => setProfileId(h)} />
      {profileId && <ProfileFollowers profileId={profileId} />}
    </>
  );
}
