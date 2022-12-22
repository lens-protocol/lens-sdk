import { MockedResponse } from '@apollo/client/testing';
import { Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  ProfileFieldsFragment,
  ProfilesToFollowQuery,
  ProfilesToFollowDocument,
  Maybe,
  GetProfileQuery,
  GetProfileDocument,
  SingleProfileQueryRequest,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressDocument,
  ProxyActionError,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  ProxyActionStatusQueryVariables,
  ProxyActionStatusQuery,
  ProxyActionStatusDocument,
  HasTxHashBeenIndexedQuery,
  TransactionErrorReasons,
  HasTxHashBeenIndexedQueryVariables,
  HasTxHashBeenIndexedDocument,
  EnabledModuleCurrenciesQuery,
  EnabledModuleCurrenciesDocument,
} from '../generated';
import { mockProfileFieldsFragment } from './fragments';

export function mockProfilesToFollowQueryMockedResponse(args: {
  profiles: ProfileFieldsFragment[];
}): MockedResponse<ProfilesToFollowQuery> {
  return {
    request: {
      query: ProfilesToFollowDocument,
    },
    result: {
      data: {
        result: args.profiles,
      },
    },
  };
}

export function mockGetProfileQuery(profile: Maybe<ProfileFieldsFragment>): GetProfileQuery {
  return {
    result: profile,
  };
}

export function mockGetProfileQueryMockedResponse({
  profile = mockProfileFieldsFragment(),
  request,
  observerId,
}: {
  profile?: Maybe<ProfileFieldsFragment>;
  request: SingleProfileQueryRequest;
  observerId?: string;
}): MockedResponse<GetProfileQuery> {
  return {
    request: {
      query: GetProfileDocument,
      variables: {
        request,
        observerId,
      },
    },
    result: {
      data: mockGetProfileQuery(profile),
    },
  };
}

function mockGetAllProfilesByOwnerAddressQuery(
  profiles: ProfileFieldsFragment[],
): GetAllProfilesByOwnerAddressQuery {
  return {
    profilesByOwner: {
      items: profiles,
    },
  };
}

export function mockGetAllProfilesByOwnerAddressQueryMockedResponse({
  address,
  profiles = [mockProfileFieldsFragment()],
}: {
  address: EthereumAddress;
  profiles?: ProfileFieldsFragment[];
}): MockedResponse<GetAllProfilesByOwnerAddressQuery> {
  return {
    request: {
      query: GetAllProfilesByOwnerAddressDocument,
      variables: {
        address,
      },
    },
    result: {
      data: mockGetAllProfilesByOwnerAddressQuery(profiles),
    },
  };
}

export function mockHasTxHashBeenIndexedQuery(
  result: { reason: TransactionErrorReasons } | { indexed: boolean; txHash: string },
): HasTxHashBeenIndexedQuery {
  return {
    result:
      'reason' in result
        ? {
            __typename: 'TransactionError',
            ...result,
          }
        : {
            __typename: 'TransactionIndexedResult',
            ...result,
          },
  };
}

export function mockHasTxHashBeenIndexedQueryMockedResponse({
  variables,
  data,
}: {
  variables: HasTxHashBeenIndexedQueryVariables;
  data: HasTxHashBeenIndexedQuery;
}): MockedResponse<HasTxHashBeenIndexedQuery> {
  return {
    request: {
      query: HasTxHashBeenIndexedDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

function mockProxyActionStatusError(overrides?: Partial<ProxyActionError>): ProxyActionError {
  return {
    __typename: 'ProxyActionError',
    reason: 'UNKNOWN',
    lastKnownTxId: '0x123',
    ...overrides,
  };
}

function mockProxyActionStatusResult(
  overrides?: Partial<ProxyActionStatusResult>,
): ProxyActionStatusResult {
  return {
    txHash: '0x123',
    txId: '1',
    status: ProxyActionStatusTypes.Minting,
    ...overrides,
    __typename: 'ProxyActionStatusResult',
  };
}

export function mockProxyActionStatusMockedResponse(instructions: {
  result: { reason: string; lastKnownTxId: string } | Partial<ProxyActionStatusResult>;
  variables: ProxyActionStatusQueryVariables;
}): MockedResponse<ProxyActionStatusQuery> {
  return {
    request: {
      query: ProxyActionStatusDocument,
      variables: instructions.variables,
    },
    result: {
      data: {
        result:
          'reason' in instructions.result
            ? mockProxyActionStatusError(instructions.result)
            : mockProxyActionStatusResult(instructions.result),
      },
    },
  };
}

export function mockEnabledModuleCurrenciesQueryMockedResponse(
  currencies: Erc20[],
): MockedResponse<EnabledModuleCurrenciesQuery> {
  return {
    request: {
      query: EnabledModuleCurrenciesDocument,
    },
    result: {
      data: {
        result: currencies.map((currency) => ({
          __typename: 'Erc20',
          address: currency.address,
          decimals: currency.decimals,
          name: currency.name,
          symbol: currency.symbol,
        })),
      },
    },
  };
}
