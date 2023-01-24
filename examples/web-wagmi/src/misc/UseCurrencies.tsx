import { useCurrencies } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';

function UseCurrenciesInner() {
  const { data: currencies, loading } = useCurrencies();
  if (loading) return <Loading />;

  if (currencies.length === 0) return <p>No enabled currencies</p>;

  return (
    <>
      {currencies.map((currency) => (
        <article key={currency.address}>
          <h3>{currency.symbol}</h3>
          <p>{currency.name}</p>
        </article>
      ))}
    </>
  );
}

export function UseCurrencies() {
  return (
    <div>
      <h1>
        <code>useCurrencies</code>
      </h1>
      <WhenLoggedInWithProfile>{() => <UseCurrenciesInner />}</WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
