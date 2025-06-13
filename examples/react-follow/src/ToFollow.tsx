import { PageSize, useAccounts } from '@lens-protocol/react';
import { AccountListItem } from './components/AccountListItem';
import { TransactionResult } from './components/TransactionResult';
import { useFollowTransaction } from './hooks/useFollowTransaction';

export function AccountsToFollow() {
  const { data } = useAccounts({
    filter: { searchBy: { localNameQuery: 'test' } },
    pageSize: PageSize.Ten,
    suspense: true,
  });

  const { transactionResult, handleFollow, handleUnfollow } = useFollowTransaction();

  return (
    <div>
      <h2>Accounts to Follow</h2>

      <TransactionResult
        loading={transactionResult.loading}
        txHash={transactionResult.txHash}
        message={transactionResult.message}
        error={transactionResult.error}
      />

      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        {data?.items.map((account) => (
          <AccountListItem
            key={account.address}
            account={account}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            isLoading={transactionResult.loading || false}
          />
        ))}
      </ol>
    </div>
  );
}
