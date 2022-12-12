import { useProfilesToFollow, ProfileFieldsFragment } from '@lens-protocol/react';

type ProfileListProps = {
  profiles: ProfileFieldsFragment[];
};

function ProfileList({ profiles }: ProfileListProps) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
  const { data, loading, error } = useProfilesToFollow();

  if (loading) return <div>Loading...</div>;

  if (error || !data) return <div>Error: {error?.message ?? 'Unexpected error.'}</div>;

  return (
    <div>
      <h1>Recommend Followers</h1>
      <ProfileList profiles={data.recommendedProfiles} />
    </div>
  );
}
