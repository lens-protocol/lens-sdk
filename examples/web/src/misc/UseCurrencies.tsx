import { Erc20, useCurrencies } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function CurrencySelector({ onChange }: { onChange: (currency: Erc20) => void }) {
  const { data: currencies, error, loading } = useCurrencies();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = currencies.find((c) => c.symbol === event.target.value);
    if (currency) onChange(currency);
  };

  return (
    <select onChange={handleChange}>
      {currencies.map((c) => (
        <option key={c.address} value={c.symbol}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export function UseCurrencies() {
  const {
    data: currencies,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useCurrencies());

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useCurrencies</code>
      </h1>
      <div>
        {currencies.map((c) => (
          <div key={c.address}>
            {c.address} - {c.symbol}
          </div>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>

      <CurrencySelector onChange={(c) => alert(c)} />
    </div>
  );
}
