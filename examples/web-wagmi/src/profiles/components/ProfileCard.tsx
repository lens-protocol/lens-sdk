import { ProfileFragment } from '@lens-protocol/react-web';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
  profile: ProfileFragment;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <article>
      <ProfilePicture picture={profile.picture} />
      <p>Handle: {profile.handle}</p>
      {profile?.name && <p>Name: {profile.name}</p>}
      {profile?.bio && <p>Bio: {profile.bio}</p>}
    </article>
  );
}

type ProfileButtonProps = {
  profile: ProfileFragment;
};

export function SmallProfileCard({ profile }: ProfileButtonProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ProfilePicture picture={profile.picture} />
      <p>{profile?.handle}</p>
    </div>
  );
}
