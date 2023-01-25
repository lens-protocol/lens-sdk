import { ProfileFragment } from '@lens-protocol/react';
import { useState } from 'react';

import { ProfilesFollowing } from './components/ProfileFollowing';
import { SelectProfile } from './components/ProfileSelector';

export function UseProfileFollowing() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <SelectProfile onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfilesFollowing walletAddress={profile.ownedBy} />}
    </>
  );
}
