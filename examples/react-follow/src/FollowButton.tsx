import { type Account, useFollow, useUnfollow } from '@lens-protocol/react';
import { handleOperationWith } from '@lens-protocol/react/viem';
import { useWalletClient } from 'wagmi';

export function FollowButton({ account }: { account: Account }) {
  const { data: wallet } = useWalletClient();
  const { execute: follow, loading: followLoading } = useFollow({
    handler: handleOperationWith(wallet),
  });
  const { execute: unfollow, loading: unfollowLoading } = useUnfollow({
    handler: handleOperationWith(wallet),
  });

  const loading = followLoading || unfollowLoading;

  const handleFollowToggle = async () => {
    const result = account.operations?.isFollowedByMe
      ? await unfollow({ account: account.address })
      : await follow({ account: account.address });

    if (result.isErr()) {
      alert(result.error.message);
      return;
    }
  };

  return (
    <button type='button' onClick={handleFollowToggle} disabled={loading}>
      {loading
        ? 'Loading...'
        : account.operations?.isFollowedByMe
          ? 'Unfollow'
          : 'Follow'}
    </button>
  );
}
