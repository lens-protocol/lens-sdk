import { useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { SelectProfileId } from '../ProfileSelector';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type ProfileByIdProps = {
  profileId: string;
};

function ProfileByIdLayout({ profileId }: ProfileByIdProps) {
  const { data: profile, loading } = useProfile({ profileId });

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Profile by ID</h2>
      <ProfileCard profile={profile} />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}

export function ProfileById() {
  const [profileId, setProfileId] = useState<string | null>(null);
  return (
    <>
      <p>Select an id:</p>
      <SelectProfileId
        onProfileSelected={(h: string) => {
          return setProfileId(h);
        }}
      />
      {profileId && profileId !== 'default' && <ProfileByIdLayout profileId={profileId} />}
    </>
  );
}
