import { ProfileFragment, useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';
import { SelectProfile } from './components/ProfileSelector';

type ProfileByHandleLayoutProps = {
  handle: string;
};

export function ProfileByHandleLayout({ handle }: ProfileByHandleLayoutProps) {
  const { data: profile, loading } = useProfile({ handle });

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Profile by Handle</h2>
      <ProfileCard profile={profile} />
    </div>
  );
}

export function ProfileByHandle() {
  const [profile, setProfile] = useState<ProfileFragment | null>(null);

  return (
    <>
      <p>Select a handle:</p>
      <SelectProfile onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfileByHandleLayout handle={profile.handle} />}
    </>
  );
}
