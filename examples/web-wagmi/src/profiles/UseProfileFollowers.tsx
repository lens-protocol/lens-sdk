import { ProfileFragment } from '@lens-protocol/react';
import { useState } from 'react';

import { ProfileFollowers } from './components/ProfileFollowers';
import { SelectProfile } from './components/ProfileSelector';

export function UseProfileFollowers() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <SelectProfile onProfileSelected={(profile) => setProfile(profile)} />
      {profile && <ProfileFollowers profileId={profile.id} />}
    </>
  );
}
