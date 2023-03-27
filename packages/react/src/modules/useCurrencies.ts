import { useEnabledModuleCurrencies } from '@lens-protocol/api-bindings';
import { ChainType, erc20, Erc20 } from '@lens-protocol/shared-kernel';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

/**
 * @category Misc
 * @group Hooks
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
