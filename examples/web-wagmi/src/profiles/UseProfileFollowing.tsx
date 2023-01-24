import { useState } from 'react';
import { ProfileFragment } from '@lens-protocol/react';

import { SelectProfile } from './components/ProfileSelector';
import { ProfilesFollowing } from './components/ProfileFollowing';

export function UseProfileFollowing() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select a profile:</p>
      <SelectProfile onProfileSelected={(profile) => setProfile(profile)} />
      {profile && <ProfilesFollowing walletAddress={profile.ownedBy} />}
    </>
  );
}
