import { Profile, ProfileStats } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
  profile: Profile;
  children?: ReactNode;
};

function ProfileTickers({ stats }: { stats: ProfileStats }) {
  return (
    <p
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        justifyContent: 'space-between',
      }}
    >
      <span>
        Followers:&nbsp;<strong>{stats.followers}</strong>
      </span>
      <span>
        Following:&nbsp;<strong>{stats.following}</strong>
      </span>
      <span>
        Collects:&nbsp;<strong>{stats.collects}</strong>
      </span>
    </p>
  );
}

export function ProfileCard({ profile, children }: ProfileCardProps) {
  const { metadata } = profile;

  return (
    <article>
      <p>ID: {profile.id}</p>
      <p>Handle: {profile.handle?.fullHandle}</p>

      {metadata && (
        <div>
          <ProfilePicture picture={metadata.picture} />
          {metadata.displayName && <p>Name: {metadata.displayName}</p>}
          {metadata.bio && <p>Bio: {metadata.bio}</p>}
        </div>
      )}

      <hr />
      <ProfileTickers stats={profile.stats} />

      {children}
    </article>
  );
}
