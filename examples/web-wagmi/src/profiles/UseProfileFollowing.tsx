import { ProfileFragment } from '@lens-protocol/react';
import { useState } from 'react';

import { ProfilesFollowing } from './components/ProfileFollowing';
import { ProfileSelector } from './components/ProfileSelector';

export function UseProfileFollowing() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfilesFollowing walletAddress={profile.ownedBy} />}
    </>
  );
}
