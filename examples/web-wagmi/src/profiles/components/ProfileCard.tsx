import { Profile } from '@lens-protocol/react-web';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
  profile: Profile;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <article>
      <ProfilePicture picture={profile.picture} />
      <p>Handle: {profile.handle}</p>
      {profile?.name && <p>Name: {profile.name}</p>}
      {profile?.bio && <p>Bio: {profile.bio}</p>}
      <ul>
        {Object.entries(profile.attributes).map(([key, value]) => (
          <li key={key}>
            <b>{key}:</b>&nbsp;
            {value.toString() ?? null}
          </li>
        ))}
      </ul>
    </article>
  );
}

type SmallProfileCardProps = {
  profile: Profile;
};

export function SmallProfileCard({ profile }: SmallProfileCardProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ProfilePicture picture={profile.picture} />
      <p>{profile?.handle}</p>
    </div>
  );
}
