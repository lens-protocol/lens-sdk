import { ProfileFieldsFragment } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
  profile: ProfileFieldsFragment;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <article>
      <Link to={`/profile/handle/${profile.handle}`}>
        <ProfilePicture picture={profile.picture} />
      </Link>
      <p>Handle: {profile?.handle}</p>
      <p>Name: {profile?.name}</p>
      <p>Bio: {profile?.bio}</p>
    </article>
  );
}
