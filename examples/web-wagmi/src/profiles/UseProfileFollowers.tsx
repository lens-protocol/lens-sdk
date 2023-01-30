import { ProfileFragment } from '@lens-protocol/react';
import { useState } from 'react';

import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileSelector } from './components/ProfileSelector';

export function UseProfileFollowers() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfileFollowers profileId={profile.id} />}
    </>
  );
}
