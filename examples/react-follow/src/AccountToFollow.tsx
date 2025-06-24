import { PageSize, useAccounts } from '@lens-protocol/react';
import { FollowButton } from './FollowButton';

export function AccountsToFollow() {
  const { data } = useAccounts({
    filter: { searchBy: { localNameQuery: 'test' } },
    pageSize: PageSize.Ten,
    suspense: true,
  });

  return (
    <div>
      <h2>Accounts to Follow</h2>

      <ul>
        {data?.items.map((account) => (
          <li key={account.address}>
            <p>
              {account.username?.localName ?? account.address}
              {': '}
              {account.operations?.isFollowedByMe
                ? 'Following'
                : 'Not Following'}
              {' → '}
              <FollowButton account={account} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
