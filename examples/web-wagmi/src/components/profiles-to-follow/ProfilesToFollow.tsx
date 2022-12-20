import { useProfilesToFollow, ProfileFieldsFragment } from '@lens-protocol/react';

import { Loading } from '../loading/Loading';
import { ProfilePicture } from '../profile/ProfilePicture';

type ProfileListProps = {
  profiles: ProfileFieldsFragment[];
};

function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <ProfilePicture picture={profile.picture} />
          <h2>{profile.name ?? `@${profile.handle}`}</h2>
          <p>{profile.bio}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export function ProfilesToFollow() {
  const { data: profilesToFollow, loading } = useProfilesToFollow();

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Recommend Followers</h1>
      <ProfileList profiles={profilesToFollow} />
    </div>
  );
}
