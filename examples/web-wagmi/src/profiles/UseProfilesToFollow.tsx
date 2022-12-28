import { useProfilesToFollow, ProfileFieldsFragment } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type ProfileListProps = {
  profiles: ProfileFieldsFragment[];
};

function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

export function ProfilesToFollow() {
  const { data: profilesToFollow, loading } = useProfilesToFollow();

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Profiles To Follow</h2>
      <ProfileList profiles={profilesToFollow} />
    </div>
  );
}
