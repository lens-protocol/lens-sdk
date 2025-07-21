import { AccountsOrderBy, PageSize, useAccounts } from '@lens-protocol/react';

export default function Home() {
  const { data } = useAccounts({
    orderBy: AccountsOrderBy.AccountScore,
    pageSize: PageSize.Ten,
    suspense: true,
  });

  return (
    <div>
      <p>Top 10 Accounts by Account Score:</p>

      <ul>
        {data.items.map((account) => (
          <li key={account.address}>{account.username?.value}</li>
        ))}
      </ul>
    </div>
  );
}
