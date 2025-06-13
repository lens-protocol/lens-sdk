import { PageSize, useAccounts, useFollow, useUnfollow } from '@lens-protocol/react';
import { handleOperationWith } from '@lens-protocol/react/viem';
import { useState } from 'react';
import { useWalletClient } from 'wagmi';

export function AccountsToFollow() {
  const { data: wallet } = useWalletClient();
  const { execute: follow, loading: followLoading } = useFollow({
    handler: handleOperationWith(wallet),
  });
  const { execute: unfollow, loading: unfollowLoading } = useUnfollow({
    handler: handleOperationWith(wallet),
  });

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const { data } = useAccounts({
    filter: { searchBy: { localNameQuery: 'test' } },
    pageSize: PageSize.Ten,
    suspense: true,
  });

  const handleFollowToggle = async (accountAddress: string, isFollowing: boolean) => {
    setError(undefined);
    setSuccess(undefined);

    try {
      const result = isFollowing
        ? await unfollow({ account: accountAddress })
        : await follow({ account: accountAddress });

      if (result.isOk()) {
        setSuccess(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} account!`);
      }

      if (result.isErr()) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Accounts to Follow</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {(followLoading || unfollowLoading) && <p style={{ color: 'blue' }}>Loading...</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <ul>
        {data?.items.map((account) => (
          <li key={account.address}>
            <p>
              {account.username?.localName ?? account.address}
              {': '}
              {account.operations?.isFollowedByMe ? 'Following' : 'Not Following'}
              {' → '}
              <button
                type='button'
                onClick={() =>
                  handleFollowToggle(account.address, account.operations?.isFollowedByMe ?? false)
                }
                disabled={followLoading || unfollowLoading}
              >
                {followLoading || unfollowLoading
                  ? 'Loading...'
                  : account.operations?.isFollowedByMe
                    ? 'Unfollow'
                    : 'Follow'}
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
