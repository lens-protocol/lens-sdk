import { useProfile } from '@lens-protocol/react';
import { useParams } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type HandleIdProps = {
  profileId: string;
};

export function Handle({ profileId }: HandleIdProps) {
  const { data: profile, loading, error } = useProfile({ profileId });

  if (loading) return <Loading />;

  if (error || !profile) return <GenericError error={error} />;

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
  return <Handle profileId={profileId} />;
}
