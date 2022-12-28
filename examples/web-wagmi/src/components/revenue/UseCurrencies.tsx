import { useCurrencies } from '@lens-protocol/react';

import { Loading } from '../loading/Loading';

export function UseCurrencies() {
  const { data: currencies, loading } = useCurrencies();

  if (loading) return <Loading />;

  return (
    <div>
      <h1>
        <code>useCurrencies</code>
      </h1>
      {currencies.map((currency) => (
        <article key={currency.address}>
          <h3>{currency.symbol}</h3>
          <p>{currency.name}</p>
        </article>
      ))}
    </div>
  );
}
