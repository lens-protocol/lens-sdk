import { Profile, useProfile } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';
import { ProfileSelector } from './components/ProfileSelector';

type ProfileByHandleLayoutProps = {
  handle: string;
};

export function ProfileByHandleLayout({ handle }: ProfileByHandleLayoutProps) {
  const { data: profile, error, loading } = useProfile({ handle });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>Profile by Handle</h2>
      <ProfileCard profile={profile} />
    </div>
  );
}

export function ProfileByHandle() {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <>
      <p>Select a handle:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfileByHandleLayout handle={profile.handle} />}
    </>
  );
}
