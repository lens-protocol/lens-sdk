import { MockedResponse } from '@apollo/client/testing';
import { Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  CommentFragment,
  EnabledModuleCurrenciesDocument,
  EnabledModuleCurrenciesQuery,
  FeedDocument,
  FeedItemFragment,
  FeedQuery,
  FeedQueryVariables,
  GetAllProfilesByOwnerAddressDocument,
  GetAllProfilesByOwnerAddressQuery,
  GetProfileDocument,
  GetProfileQuery,
  HasTxHashBeenIndexedDocument,
  HasTxHashBeenIndexedQuery,
  HasTxHashBeenIndexedQueryVariables,
  Maybe,
  PostFragment,
  ProfileFieldsFragment,
  ProfilesToFollowDocument,
  ProfilesToFollowQuery,
  ProxyActionError,
  ProxyActionStatusDocument,
  ProxyActionStatusQuery,
  ProxyActionStatusQueryVariables,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  PublicationDocument,
  PublicationQuery,
  PublicationsDocument,
  PublicationsQuery,
  PublicationsQueryVariables,
  SingleProfileQueryRequest,
  TransactionErrorReasons,
  MutualFollowersProfilesQuery,
  MutualFollowersProfilesDocument,
  MutualFollowersProfilesQueryVariables,
  ExplorePublicationsQueryVariables,
  MirrorFragment,
  ExplorePublicationsQuery,
  ExplorePublicationsDocument,
  WhoReactedPublicationQuery,
  WhoReactedPublicationQueryVariables,
  WhoReactedPublicationDocument,
  WhoReactedResultFragment,
} from '../generated';
import { mockProfileFieldsFragment } from './fragments';

export function createProfilesToFollowQueryMockedResponse(args: {
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

export function createGetProfileQueryMockedResponse({
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

export function createGetAllProfilesByOwnerAddressQueryMockedResponse({
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

export function createHasTxHashBeenIndexedQueryMockedResponse({
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

export function createProxyActionStatusMockedResponse(instructions: {
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

export function createEnabledModuleCurrenciesQueryMockedResponse(
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

export function mockMutualFollowersQuery(args: {
  variables: MutualFollowersProfilesQueryVariables;
  profiles: ProfileFieldsFragment[];
}): MockedResponse<MutualFollowersProfilesQuery> {
  return {
    request: {
      query: MutualFollowersProfilesDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.profiles,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.profiles.length,
          },
        },
      },
    },
  };
}

export function createPublicationQueryMockedResponse(
  publication: PostFragment,
): MockedResponse<PublicationQuery> {
  return {
    request: {
      query: PublicationDocument,
      variables: {
        publicationId: publication.id,
      },
    },
    result: {
      data: {
        result: publication,
      },
    },
  };
}

export function createPublicationsQueryMockedResponse(args: {
  variables: PublicationsQueryVariables;
  publications: Array<CommentFragment | PostFragment>;
}): MockedResponse<PublicationsQuery> {
  return {
    request: {
      query: PublicationsDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.publications,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.publications.length,
          },
        },
      },
    },
  };
}

export function createFeedQueryMockedResponse(args: {
  variables: FeedQueryVariables;
  items: FeedItemFragment[];
}): MockedResponse<FeedQuery> {
  return {
    request: {
      query: FeedDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.items.length,
          },
        },
      },
    },
  };
}

export function createExplorePublicationsQueryMockedResponse(args: {
  variables: ExplorePublicationsQueryVariables;
  items: Array<PostFragment | CommentFragment | MirrorFragment>;
}): MockedResponse<ExplorePublicationsQuery> {
  return {
    request: {
      query: ExplorePublicationsDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.items.length,
          },
        },
      },
    },
  };
}

export function createWhoReactedPublicationQueryMockedResponse(args: {
  variables: WhoReactedPublicationQueryVariables;
  items: Array<WhoReactedResultFragment>;
}): MockedResponse<WhoReactedPublicationQuery> {
  return {
    request: {
      query: WhoReactedPublicationDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.items.length,
          },
        },
      },
    },
  };
}
