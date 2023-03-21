import { MockedResponse } from '@apollo/client/testing';
import { AppId } from '@lens-protocol/domain/entities';
import { Erc20 } from '@lens-protocol/shared-kernel';

import {
  CommentFragment,
  CommentWithFirstCommentFragment,
  CommonPaginatedResultInfoFragment,
  EnabledModuleCurrenciesDocument,
  EnabledModuleCurrenciesQuery,
  EnabledModulesDocument,
  EnabledModulesFragment,
  EnabledModulesQuery,
  ExploreProfilesDocument,
  ExploreProfilesQuery,
  ExploreProfilesQueryVariables,
  ExplorePublicationsDocument,
  ExplorePublicationsQuery,
  ExplorePublicationsQueryVariables,
  FeedDocument,
  FeedItemFragment,
  FeedQuery,
  FeedQueryVariables,
  GetAllProfilesByOwnerAddressDocument,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressQueryVariables,
  GetAllProfilesByWhoMirroredPublicationDocument,
  GetAllProfilesByWhoMirroredPublicationQueryVariables,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  HasTxHashBeenIndexedDocument,
  HasTxHashBeenIndexedQuery,
  HasTxHashBeenIndexedQueryVariables,
  Maybe,
  MirrorFragment,
  MutualFollowersProfilesDocument,
  MutualFollowersProfilesQuery,
  MutualFollowersProfilesQueryVariables,
  PostFragment,
  ProfileFollowRevenueDocument,
  ProfileFollowRevenueFragment,
  ProfileFollowRevenueQuery,
  ProfileFollowRevenueQueryVariables,
  ProfileFragment,
  ProfilePublicationRevenueDocument,
  ProfilePublicationRevenueQuery,
  ProfilePublicationRevenueQueryVariables,
  ProfilePublicationsForSaleDocument,
  ProfilePublicationsForSaleQuery,
  ProfilePublicationsForSaleQueryVariables,
  ProfilesToFollowDocument,
  ProfilesToFollowQuery,
  ProfilesToFollowQueryVariables,
  ProxyActionError,
  ProxyActionStatusDocument,
  ProxyActionStatusQuery,
  ProxyActionStatusQueryVariables,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  PublicationByTxHashDocument,
  PublicationByTxHashQuery,
  PublicationByTxHashQueryVariables,
  PublicationDocument,
  PublicationQuery,
  PublicationQueryVariables,
  PublicationRevenueDocument,
  PublicationRevenueFragment,
  PublicationRevenueQuery,
  PublicationRevenueQueryVariables,
  PublicationsDocument,
  PublicationsQuery,
  PublicationsQueryVariables,
  SearchProfilesDocument,
  SearchProfilesQueryVariables,
  SearchPublicationsDocument,
  SearchPublicationsQueryVariables,
  TransactionErrorReasons,
  WalletFragment,
  WhoCollectedPublicationDocument,
  WhoCollectedPublicationQuery,
  WhoCollectedPublicationQueryVariables,
  WhoReactedPublicationDocument,
  WhoReactedPublicationQuery,
  WhoReactedPublicationQueryVariables,
  WhoReactedResultFragment,
} from '../generated';
import { SearchProfilesQuery, SearchPublicationsQuery } from '../index';
import { Sources } from '../sources';
import { AnyPublicationFragment, ContentPublicationFragment } from '../utils/publication';
import {
  mockEnabledModulesFragment,
  mockFeedItemFragment,
  mockPostFragment,
  mockProfileFragment,
} from './fragments';

export function mockSources(): Sources {
  return ['foobar' as AppId];
}

export function createProfilesToFollowQueryMockedResponse({
  variables,
  profiles,
}: {
  variables: ProfilesToFollowQueryVariables;
  profiles: ProfileFragment[];
}): MockedResponse<ProfilesToFollowQuery> {
  return {
    request: {
      query: ProfilesToFollowDocument,
      variables,
    },
    result: {
      data: {
        result: profiles,
      },
    },
  };
}

export function mockGetProfileQuery(profile: Maybe<ProfileFragment>): GetProfileQuery {
  return {
    result: profile,
  };
}

export function mockGetProfileQueryMockedResponse({
  variables,
  profile = mockProfileFragment(),
}: {
  variables: GetProfileQueryVariables;
  profile?: Maybe<ProfileFragment>;
}): MockedResponse<GetProfileQuery> {
  return {
    request: {
      query: GetProfileDocument,
      variables,
    },
    result: {
      data: mockGetProfileQuery(profile),
    },
  };
}

function mockGetAllProfilesByOwnerAddressQuery(
  profiles: ProfileFragment[],
): GetAllProfilesByOwnerAddressQuery {
  return {
    result: {
      items: profiles,
      pageInfo: {
        __typename: 'PaginatedResultInfo',
        totalCount: null,
        next: null,
        prev: null,
      },
    },
  };
}

export function createGetAllProfilesByOwnerAddressQueryMockedResponse({
  variables,
  profiles = [mockProfileFragment()],
}: {
  variables: GetAllProfilesByOwnerAddressQueryVariables;
  profiles?: ProfileFragment[];
}): MockedResponse<GetAllProfilesByOwnerAddressQuery> {
  return {
    request: {
      query: GetAllProfilesByOwnerAddressDocument,
      variables,
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

export function createWhoCollectedPublicationQueryMockedResponse(args: {
  variables: WhoCollectedPublicationQueryVariables;
  wallets: WalletFragment[];
}): MockedResponse<WhoCollectedPublicationQuery> {
  return {
    request: {
      query: WhoCollectedPublicationDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.wallets,
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.wallets.length,
          },
        },
      },
    },
  };
}

export function createMutualFollowersQueryMockedResponse(args: {
  variables: MutualFollowersProfilesQueryVariables;
  profiles: ProfileFragment[];
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

export type MockFeedQueryArgs = {
  items?: Array<FeedItemFragment>;
  pageInfo?: Pick<CommonPaginatedResultInfoFragment, 'next' | 'prev'>;
};

export function mockFeedQuery({
  items = [mockFeedItemFragment(), mockFeedItemFragment()],
  pageInfo = {
    prev: null,
    next: null,
  },
}: MockFeedQueryArgs = {}): FeedQuery {
  return {
    result: {
      items,
      pageInfo: {
        __typename: 'PaginatedResultInfo',
        totalCount: null,
        ...pageInfo,
      },
    },
  };
}

export function createPublicationQueryMockedResponse({
  variables,
  result,
}: {
  variables: PublicationQueryVariables;
  result: AnyPublicationFragment | null;
}): MockedResponse<PublicationQuery> {
  return {
    request: {
      query: PublicationDocument,
      variables,
    },
    result: {
      data: { result },
    },
  };
}

export function createPublicationsQueryMockedResponse(args: {
  variables: PublicationsQueryVariables;
  publications: Array<AnyPublicationFragment>;
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

export function createPublicationRevenueQueryMockedResponse(args: {
  variables: PublicationRevenueQueryVariables;
  revenue: PublicationRevenueFragment | null;
}): MockedResponse<PublicationRevenueQuery> {
  return {
    request: {
      query: PublicationRevenueDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: args.revenue,
      },
    },
  };
}

export function createProfilePublicationRevenueQueryMockedResponse(args: {
  variables: ProfilePublicationRevenueQueryVariables;
  items: PublicationRevenueFragment[];
}): MockedResponse<ProfilePublicationRevenueQuery> {
  return {
    request: {
      query: ProfilePublicationRevenueDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.items.length,
          },
          items: args.items,
        },
      },
    },
  };
}

export function createProfilePublicationsForSaleQueryMockedResponse(args: {
  variables: ProfilePublicationsForSaleQueryVariables;
  items: ContentPublicationFragment[];
}): MockedResponse<ProfilePublicationsForSaleQuery> {
  return {
    request: {
      query: ProfilePublicationsForSaleDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          pageInfo: {
            __typename: 'PaginatedResultInfo',
            prev: null,
            next: null,
            totalCount: args.items.length,
          },
          items: args.items,
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

export function createProfileFollowRevenueQueryMockedResponse({
  variables,
  revenues,
}: {
  variables: ProfileFollowRevenueQueryVariables;
  revenues: ProfileFollowRevenueFragment;
}): MockedResponse<ProfileFollowRevenueQuery> {
  return {
    request: {
      query: ProfileFollowRevenueDocument,
      variables,
    },
    result: {
      data: {
        result: revenues,
      },
    },
  };
}

export function createSearchProfilesQueryMockedResponse(args: {
  variables: SearchProfilesQueryVariables;
  items: ProfileFragment[];
}): MockedResponse<SearchProfilesQuery> {
  return {
    request: {
      query: SearchProfilesDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          __typename: 'ProfileSearchResult',
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

export function createExploreProfilesQueryMockedResponse(args: {
  variables: ExploreProfilesQueryVariables;
  items: Array<ProfileFragment>;
}): MockedResponse<ExploreProfilesQuery> {
  return {
    request: {
      query: ExploreProfilesDocument,
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

export function createProfilesWhoMirroredPublicationMockedResponse(args: {
  variables: GetAllProfilesByWhoMirroredPublicationQueryVariables;
  items: ProfileFragment[];
}): MockedResponse<GetAllProfilesByOwnerAddressQuery> {
  return {
    request: {
      query: GetAllProfilesByWhoMirroredPublicationDocument,
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

export function createSearchPublicationsQueryMockedResponse(args: {
  variables: SearchPublicationsQueryVariables;
  items: Array<ContentPublicationFragment>;
}): MockedResponse<SearchPublicationsQuery> {
  return {
    request: {
      query: SearchPublicationsDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          __typename: 'PublicationSearchResult',
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

function mockPublicationByTxHash(
  publication: CommentWithFirstCommentFragment | PostFragment | MirrorFragment = mockPostFragment(),
): PublicationByTxHashQuery {
  return {
    result: publication,
  };
}

export function mockPublicationByTxHashMockedResponse({
  variables,
  publication,
}: {
  variables: PublicationByTxHashQueryVariables;
  publication: CommentWithFirstCommentFragment | PostFragment | MirrorFragment;
}): MockedResponse<PublicationByTxHashQuery> {
  return {
    request: {
      query: PublicationByTxHashDocument,
      variables,
    },
    result: {
      data: mockPublicationByTxHash(publication),
    },
  };
}

export function createEnabledModulesQueryMockedResponse({
  data = mockEnabledModulesFragment(),
}: {
  data?: EnabledModulesFragment;
} = {}): MockedResponse<EnabledModulesQuery> {
  return {
    request: {
      query: EnabledModulesDocument,
    },
    result: {
      data: {
        result: data,
      },
    },
  };
}
