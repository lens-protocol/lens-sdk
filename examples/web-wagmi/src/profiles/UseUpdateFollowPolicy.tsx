import { ProfileFieldsFragment } from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedIn } from '../components/auth/auth';

type UpdateFollowPolicyProps = {
  profile: ProfileFieldsFragment;
};

function UpdateFollowPolicy({ profile }: UpdateFollowPolicyProps) {
  const followModule = profile.followModule?.__typename;

  return (
    <div>
      <p>
        Current follow policy: <span>{followModule ?? 'No follow module'}</span>
      </p>
    </div>
  );
}

export function UseUpdateFollowPolicy() {
  return (
    <>
      <h1>
        <code>useUpdateFollowPolicy</code>
      </h1>
      <WhenLoggedIn>{({ profile }) => <UpdateFollowPolicy profile={profile} />}</WhenLoggedIn>
      <UnauthenticatedFallback message="Log in to update your follow policy." />
    </>
  );
}
