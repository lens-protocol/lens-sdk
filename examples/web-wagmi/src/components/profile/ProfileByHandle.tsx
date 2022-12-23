import { useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { SelectProfileHandle } from '../ProfileSelector';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';
import { ProfileFollowers } from './ProfileFollowers';
import { ProfilesFollowing } from './ProfileFollowing';

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          width: '100%',
        }}
      >
        <ProfileFollowers profileId={profile.id} />
        <ProfilesFollowing walletAddress={profile.ownedBy} />
      </div>
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
