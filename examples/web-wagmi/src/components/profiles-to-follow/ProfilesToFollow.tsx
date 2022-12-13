import { useProfilesToFollow, ProfileFieldsFragment } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';

type ProfileListProps = {
  profiles: ProfileFieldsFragment[];
};

function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h2>{profile.name ?? `@${profile.handle}`}</h2>
          <p>{profile.bio}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export function ProfilesToFollow() {
  const { data: profilesToFollow, error, loading } = useProfilesToFollow();

  if (loading) return <Loading />;

  if (error || !profilesToFollow) return <GenericError error={error} />;

  return (
    <div>
      <h1>Recommend Followers</h1>
      <ProfileList profiles={profilesToFollow} />
    </div>
  );
}
