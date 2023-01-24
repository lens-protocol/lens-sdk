import { useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';
import { SelectProfileHandle } from './components/ProfileSelector';

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
  const [handle, setHandle] = useState<string | null>(null);
  return (
    <>
      <p>Select a handle:</p>
      <SelectProfileHandle
        onProfileSelected={(h: string) => {
          return setHandle(h);
        }}
      />
      {handle && handle !== 'default' && <ProfileByHandleLayout handle={handle} />}
    </>
  );
}
