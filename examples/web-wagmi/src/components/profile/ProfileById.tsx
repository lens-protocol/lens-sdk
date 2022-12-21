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
      <h2>Profile by ID</h2>
      <ProfileCard profile={profile} />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}

export function ProfileById() {
  const { profileId } = useParams();
  if (!profileId) return <GenericError error={new Error('Page not found')} />;
  return <ProfileByIdLayout profileId={profileId} />;
}
