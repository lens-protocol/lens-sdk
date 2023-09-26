import { useEnabledModuleCurrencies } from '@lens-protocol/api-bindings';
import { ChainType, erc20, Erc20 } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

/**
 * `useCurrencies` lets you get the list of ERC20 that are enabled on the Lens protocol
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * **Pro-tip**: use this hook to populate a dropdown menu of currencies
 * to choose from for powering a collect policy form of your post composer interface.
 *
 * @category Misc
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { useCurrencies, Erc20 } from '@lens-protocol/react-web';
 *
 * function CurrencySelector({ onChange }: { onChange: (currency: Erc20) => void }) {
 *   const { data: currencies, error, loading } = useCurrencies();
 *
 *   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
 *     const currency = currencies.find((currency) => currency.symbol === event.target.value);
 *     if (currency) onChange(currency);
 *   };
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <select onChange={handleChange}>
 *       {currencies.map((currency) => (
 *         <option key={currency.hash} value={currency.symbol}>{currency.name}</option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useCurrencies(): ReadResult<Erc20[]> {
  const { data, error, loading } = useReadResult(useEnabledModuleCurrencies(useLensApolloClient()));

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: error,
      loading: false,
    };
  }

  return {
    data: (data ?? []).map((currency) => erc20({ ...currency, chainType: ChainType.POLYGON })),
    error: undefined,
    loading: false,
  };
}
