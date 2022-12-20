import { useProfile } from '@lens-protocol/react';
import { useParams } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type ProfileByIdLayoutProps = {
  profileId: string;
};

export function ProfileByIdLayout({ profileId }: ProfileByIdLayoutProps) {
  const { data: profile, loading } = useProfile({ profileId });

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Profile by ID</h1>
      <ProfileCard profile={profile} />
      <hr />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}

export function ProfileById() {
  const { profileId } = useParams();
  if (!profileId) return <GenericError error={new Error('Page not found')} />;
  return <ProfileByIdLayout profileId={profileId} />;
}
