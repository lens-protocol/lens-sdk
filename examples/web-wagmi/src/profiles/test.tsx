import { ProfileFieldsFragment, useFollow } from '@lens-protocol/react';

type ProfileFollowProps = {
  profile: ProfileFieldsFragment;
};

export function FollowProfile({ profile }: ProfileFollowProps) {
  const { follow, isPending } = useFollow({ profile });

  if (profile.isFollowedByMe || profile.isOptimisticFollowedByMe) {
    return <p>Following</p>;
  }

  return (
    <button onClick={follow} disabled={isPending}>
      {isPending ? 'Follow in progress...' : 'Follow'}
    </button>
  );
}
