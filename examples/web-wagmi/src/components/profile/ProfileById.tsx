import { useProfile } from '@lens-protocol/react';

import { Loading } from '../loading/Loading';
import { ProfilePicture } from './ProfilePicture';

export function ProfileById() {
  const { data: profile, loading } = useProfile({ profileId: '0x01' });

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Profile by ID</h1>
      <ProfilePicture picture={profile.picture} />
      <p>Handle: {profile?.handle}</p>
      <p>Name: {profile?.name}</p>
      <p>Bio: {profile?.bio}</p>
      <hr />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
