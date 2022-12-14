import { useProfileByHandle } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from './ProfilePicture';

export function ProfileByHandle() {
  const { data: profile, loading, error } = useProfileByHandle({ handle: 'lensprotocol.test' });

  if (loading) return <Loading />;

  if (error || !profile) return <GenericError error={error} />;

  return (
    <div>
      <h1>Profile by Handle</h1>
      <ProfilePicture picture={profile.picture} />
      <p>Handle: {profile?.handle}</p>
      <p>Name: {profile?.name}</p>
      <p>Bio: {profile?.bio}</p>
      <hr />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
