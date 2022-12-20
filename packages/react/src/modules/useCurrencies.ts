import { Erc20Fragment, useEnabledModuleCurrenciesQuery } from '@lens-protocol/api';
import { ChainType, erc20, Erc20 } from '@lens-protocol/shared-kernel';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export function useCurrencies(): ReadResult<Erc20[]> {
  const { apolloClient } = useSharedDependencies();
  const { data, loading } = useReadResult<Erc20Fragment[]>(
    useEnabledModuleCurrenciesQuery({ client: apolloClient }),
  );

  if (loading) {
    return {
      loading: true,
      data: undefined,
    };
  }

  return {
    loading: false,
    data: (data ?? []).map((currency) => erc20({ ...currency, chainType: ChainType.POLYGON })),
  };
}
