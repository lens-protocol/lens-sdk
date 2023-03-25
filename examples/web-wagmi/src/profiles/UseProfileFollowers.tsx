import { Profile } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileSelector } from './components/ProfileSelector';

export function UseProfileFollowers() {
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfileFollowers profileId={profile.id} />}
    </>
  );
}
