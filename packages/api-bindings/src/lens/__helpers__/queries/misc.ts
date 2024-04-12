import { Erc20 } from '@lens-protocol/shared-kernel';

import {
  CurrenciesDocument,
  CurrenciesVariables,
  Erc20 as ApiErc20,
  PaginatedResultInfo,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

export function mockCurrenciesResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: CurrenciesVariables;
  items: Array<Erc20>;
  info?: PaginatedResultInfo;
}) {
  return {
    request: {
      query: CurrenciesDocument,
      variables,
    },
    result: {
      data: {
        result: {
          items: items.map(
            (currency): ApiErc20 => ({
              __typename: 'Erc20',
              name: currency.name,
              symbol: currency.symbol,
              decimals: currency.decimals,
              contract: {
                __typename: 'NetworkAddress',
                address: currency.address,
                chainId: 80002,
              },
            }),
          ),
          pageInfo: info,
        },
      },
    },
  };
}
