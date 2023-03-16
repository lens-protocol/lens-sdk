import { useCurrencies } from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function UseCurrenciesInner() {
  const { data: currencies, error, loading } = useCurrencies();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
