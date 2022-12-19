<<<<<<< HEAD
import { useProfileById } from '@lens-protocol/react';
import { useParams } from 'react-router-dom';
=======
import { useProfile } from '@lens-protocol/react';
>>>>>>> main

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfileCard } from './ProfileCard';

type HandleIdProps = {
  id: string;
};

export function Handle({ id }: HandleIdProps) {
  const { data: profile, loading, error } = useProfileById({ id });

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
  const { id } = useParams();
  if (!id) return <GenericError error={new Error('Page not found')} />;
  return <Handle id={id} />;
}
