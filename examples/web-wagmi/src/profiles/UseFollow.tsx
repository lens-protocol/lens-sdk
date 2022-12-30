import { ProfileFieldsFragment, useExploreProfiles, useFollow } from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

type ProfileFollowProps = {
  profile: ProfileFieldsFragment;
};

function ProfileFollow({ profile }: ProfileFollowProps) {
  const { follow } = useFollow({ profile });

  console.log({ profile });

  return (
    <article>
      <ProfileCard profile={profile} />
      {profile.isFollowedByMe ? 'Following' : <button onClick={follow}>Follow</button>}
    </article>
  );
}

export function UseFollow() {
  const { data, loading } = useExploreProfiles();

  if (loading) return <Loading />;

  return (
    <div>
      <h1>UseFollow</h1>
      <p>TODO: Implement</p>
      {data.map((profile: ProfileFieldsFragment) => (
        <ProfileFollow key={profile.handle} profile={profile} />
      ))}
    </div>
  );
}
