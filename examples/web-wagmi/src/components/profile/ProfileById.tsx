import { useProfile } from '@lens-protocol/react';

import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type ProfileByIdProps = {
  profileId: string;
};

export function ProfileById({ profileId }: ProfileByIdProps) {
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
