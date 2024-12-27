import { AccountsOrderBy, PageSize } from '@lens-protocol/client';
import { fetchAccounts } from '@lens-protocol/client/actions';
import { client } from './client';

export default async function Home() {
  const result = await fetchAccounts(client, {
    orderBy: AccountsOrderBy.AccountScore,
    pageSize: PageSize.Ten,
  });

  if (result.isErr()) {
    return <div>{result.error.message}</div>;
  }

  return (
    <div>
      <p>Top 10 Accounts by Account Score:</p>

      <ul>
        {result.value?.items.map((account) => (
          <li key={account.address}>{account.username?.value}</li>
        ))}
      </ul>
    </div>
  );
}
