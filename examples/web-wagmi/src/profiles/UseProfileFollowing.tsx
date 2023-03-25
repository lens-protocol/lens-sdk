import { Profile } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ProfilesFollowing } from './components/ProfileFollowing';
import { ProfileSelector } from './components/ProfileSelector';

export function UseProfileFollowing() {
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfilesFollowing walletAddress={profile.ownedBy} />}
    </>
  );
}
