import { Profile } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
  profile: Profile;
  children?: ReactNode;
};

export function ProfileCard({ profile, children }: ProfileCardProps) {
  const { metadata } = profile;

  return (
    <article>
      <p>ID: {profile.id}</p>
      <p>Handle: {profile.handle}</p>

      {metadata && (
        <div>
          <ProfilePicture picture={metadata.picture} />
          <p>Name: {metadata.displayName}</p>
          <p>Bio: {metadata.bio}</p>
          <ul>
            {(metadata.attributes ?? []).map((attribute) => (
              <li key={attribute.key}>
                <b>{attribute.key}:</b>&nbsp;
                {attribute.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </article>
  );
}
