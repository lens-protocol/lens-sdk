import { ProfileFragment, useProfile } from '@lens-protocol/react';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';
import { ProfileSelector } from './components/ProfileSelector';

type ProfileByIdProps = {
  profileId: string;
};

function ProfileByIdLayout({ profileId }: ProfileByIdProps) {
  const { data: profile, error, loading } = useProfile({ profileId });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
  const [profile, setProfile] = useState<ProfileFragment | null>(null);
  return (
    <>
      <p>Select an id:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <ProfileByIdLayout profileId={profile.id} />}
    </>
  );
}
