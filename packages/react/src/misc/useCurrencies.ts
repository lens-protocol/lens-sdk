import {
  PaginatedOffsetRequest,
  chainType,
  useCurrencies as useCurrenciesHook,
} from '@lens-protocol/api-bindings';
import { erc20, Erc20 } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useCurrencies} hook arguments
 */
export type UseCurrenciesArgs = PaginatedArgs<PaginatedOffsetRequest>;

/**
 * `useCurrencies` is a paginated hook that lets you fetch ERC20 tokens that are enabled on the Lens protocol.
 *
 * **Pro-tip**: use this hook to populate a dropdown menu of currencies to choose from
 * to support for example a collect open action form or setup follow policy fees.
 *
 * @category Misc
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useCurrencies();
 * ```
 *
 * @example
 * ```tsx
 * function CurrencySelector({ onChange }: { onChange: (currency: Erc20) => void }) {
 *   const { data: currencies, error, loading } = useCurrencies();
 *
 *   if (loading) return <Loader />;
 *
 *   if (error) return <Error message={error.message} />;
 *
 *   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
 *     const currency = currencies.find((c) => c.symbol === event.target.value);
 *     if (currency) onChange(currency);
 *   };
 *
 *   return (
 *     <select onChange={handleChange}>
 *       {currencies.map((c) => (
 *         <option key={c.address} value={c.symbol}>
 *           {c.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useCurrencies(args: UseCurrenciesArgs = {}): PaginatedReadResult<Erc20[]> {
  const result = usePaginatedReadResult(
    useCurrenciesHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );

  if (result.loading) {
    return result;
  }

  if (result.error) {
    return result;
  }

  return {
    ...result,
    data: (result.data ?? []).map((currency) =>
      erc20({
        name: currency.name,
        decimals: currency.decimals,
        symbol: currency.symbol,
        address: currency.contract.address,
        chainType: chainType(currency.contract.chainId),
      }),
    ),
  };
}
