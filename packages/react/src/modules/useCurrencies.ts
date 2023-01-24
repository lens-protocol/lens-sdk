import { Erc20Fragment, useEnabledModuleCurrenciesQuery } from '@lens-protocol/api-bindings';
import { ChainType, erc20, Erc20 } from '@lens-protocol/shared-kernel';

import { ReadResult, useReadResult } from '../helpers';
import { NetworkError } from '../publication/adapters/NetworkError';
import { useSharedDependencies } from '../shared';

export function useCurrencies(): ReadResult<Erc20[], NetworkError> {
  const { apolloClient } = useSharedDependencies();
  const { data, error, loading } = useReadResult<Erc20Fragment[]>(
    useEnabledModuleCurrenciesQuery({ client: apolloClient }),
  );

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
