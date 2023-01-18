import { useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';
import { SelectProfileId } from './components/ProfileSelector';

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
      <h3>Attributes</h3>
      <ul>
        {Object.entries(profile.attributes).map(([key, value]) => (
          <li key={key}>
            <b>{key}:</b>&nbsp;
            {value.toString() ?? null}
          </li>
        ))}
      </ul>
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
