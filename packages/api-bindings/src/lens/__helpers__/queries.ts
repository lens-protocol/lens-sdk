import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { AppId } from '@lens-protocol/domain/entities';
import { Erc20 } from '@lens-protocol/shared-kernel';

import { Cursor } from '../Cursor';
import {
  Comment,
  EnabledModuleCurrenciesData,
  EnabledModuleCurrenciesDocument,
  EnabledModules,
  EnabledModulesData,
  EnabledModulesDocument,
  ExploreProfilesData,
  ExploreProfilesDocument,
  ExploreProfilesVariables,
  ExplorePublicationsData,
  ExplorePublicationsDocument,
  ExplorePublicationsVariables,
  FeedData,
  FeedDocument,
  FeedItem,
  FeedVariables,
  GetAllProfilesData,
  GetAllProfilesDocument,
  GetAllProfilesVariables,
  GetProfileBookmarksData,
  GetProfileBookmarksDocument,
  GetProfileBookmarksVariables,
  GetProfileData,
  GetProfileDocument,
  GetProfilePublicationRevenueData,
  GetProfilePublicationRevenueDocument,
  GetProfilePublicationRevenueVariables,
  GetProfileVariables,
  GetPublicationData,
  GetPublicationDocument,
  GetPublicationRevenueData,
  GetPublicationRevenueDocument,
  GetPublicationRevenueVariables,
  GetPublicationsData,
  GetPublicationsDocument,
  GetPublicationsVariables,
  GetPublicationVariables,
  HasTxHashBeenIndexedData,
  HasTxHashBeenIndexedDocument,
  HasTxHashBeenIndexedVariables,
  Maybe,
  Mirror,
  MutualFollowersProfilesData,
  MutualFollowersProfilesDocument,
  MutualFollowersProfilesVariables,
  Post,
  Profile,
  ProfileFollowRevenue,
  ProfileFollowRevenueData,
  ProfileFollowRevenueDocument,
  ProfileFollowRevenueVariables,
  ProfilePublicationsForSaleData,
  ProfilePublicationsForSaleDocument,
  ProfilePublicationsForSaleVariables,
  ProfilesToFollowData,
  ProfilesToFollowDocument,
  ProfilesToFollowVariables,
  ProxyActionError,
  ProxyActionStatusData,
  ProxyActionStatusDocument,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  ProxyActionStatusVariables,
  PublicationRevenue,
  SearchProfilesDocument,
  SearchProfilesVariables,
  SearchPublicationsDocument,
  SearchPublicationsVariables,
  TransactionErrorReasons,
  Wallet,
  WhoCollectedPublicationData,
  WhoCollectedPublicationDocument,
  WhoCollectedPublicationVariables,
  WhoReactedPublicationData,
  WhoReactedPublicationDocument,
  WhoReactedPublicationVariables,
  WhoReactedResult,
} from '../generated';
import { SearchProfilesData, SearchPublicationsData } from '../index';
import { Sources } from '../sources';
import { AnyPublication, ContentPublication } from '../utils/publication';
import {
  mockEnabledModulesFragment,
  mockPaginatedResultInfo,
  mockPostFragment,
  mockProfileFragment,
} from './fragments';

export function mockSources(): Sources {
  return ['foobar' as AppId];
}

export function mockCursor(): Cursor {
  return faker.random.alphaNumeric(10) as Cursor;
}

export function mockProfilesToFollowResponse({
  variables,
  profiles,
}: {
  variables: ProfilesToFollowVariables;
  profiles: Profile[];
}): MockedResponse<ProfilesToFollowData> {
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

export function mockGetProfileResponse({
  variables,
  profile = mockProfileFragment(),
}: {
  variables: GetProfileVariables;
  profile?: Maybe<Profile>;
}): MockedResponse<GetProfileData> {
  return {
    request: {
      query: GetProfileDocument,
      variables,
    },
    result: {
      data: {
        result: profile,
      },
    },
  };
}

function mockGetAllProfilesData(profiles: Profile[]): GetAllProfilesData {
  return {
    result: {
      items: profiles,
      pageInfo: mockPaginatedResultInfo(),
    },
  };
}

export function mockGetAllProfilesResponse({
  variables,
  profiles = [mockProfileFragment()],
}: {
  variables: GetAllProfilesVariables;
  profiles?: Profile[];
}): MockedResponse<GetAllProfilesData> {
  return {
    request: {
      query: GetAllProfilesDocument,
      variables,
    },
    result: {
      data: mockGetAllProfilesData(profiles),
    },
  };
}

export function mockHasTxHashBeenIndexedData(
  result: { reason: TransactionErrorReasons } | { indexed: boolean; txHash: string },
): HasTxHashBeenIndexedData {
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

export function mockHasTxHashBeenIndexedResponse({
  variables,
  data,
}: {
  variables: HasTxHashBeenIndexedVariables;
  data: HasTxHashBeenIndexedData;
}): MockedResponse<HasTxHashBeenIndexedData> {
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

function mockProxyActionError(overrides?: Partial<ProxyActionError>): ProxyActionError {
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

export function mockProxyActionStatusResponse(instructions: {
  result: { reason: string; lastKnownTxId: string } | Partial<ProxyActionStatusResult>;
  variables: ProxyActionStatusVariables;
}): MockedResponse<ProxyActionStatusData> {
  return {
    request: {
      query: ProxyActionStatusDocument,
      variables: instructions.variables,
    },
    result: {
      data: {
        result:
          'reason' in instructions.result
            ? mockProxyActionError(instructions.result)
            : mockProxyActionStatusResult(instructions.result),
      },
    },
  };
}

export function mockEnabledModuleCurrenciesResponse(
  currencies: Erc20[],
): MockedResponse<EnabledModuleCurrenciesData> {
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

export function mockWhoCollectedPublicationResponse(args: {
  variables: WhoCollectedPublicationVariables;
  wallets: Wallet[];
}): MockedResponse<WhoCollectedPublicationData> {
  return {
    request: {
      query: WhoCollectedPublicationDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.wallets,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.wallets.length }),
        },
      },
    },
  };
}

export function mockMutualFollowersResponse(args: {
  variables: MutualFollowersProfilesVariables;
  profiles: Profile[];
}): MockedResponse<MutualFollowersProfilesData> {
  return {
    request: {
      query: MutualFollowersProfilesDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.profiles,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.profiles.length }),
        },
      },
    },
  };
}

export function mockGetPublicationsResponse(args: {
  variables: GetPublicationsVariables;
  publications: Array<AnyPublication>;
}): MockedResponse<GetPublicationsData> {
  return {
    request: {
      query: GetPublicationsDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.publications,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.publications.length }),
        },
      },
    },
  };
}

export function mockFeedResponse(args: {
  variables: FeedVariables;
  items: FeedItem[];
}): MockedResponse<FeedData> {
  return {
    request: {
      query: FeedDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockExplorePublicationsResponse(args: {
  variables: ExplorePublicationsVariables;
  items: Array<Post | Comment | Mirror>;
}): MockedResponse<ExplorePublicationsData> {
  return {
    request: {
      query: ExplorePublicationsDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockGetPublicationRevenueResponse(args: {
  variables: GetPublicationRevenueVariables;
  revenue: PublicationRevenue | null;
}): MockedResponse<GetPublicationRevenueData> {
  return {
    request: {
      query: GetPublicationRevenueDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: args.revenue,
      },
    },
  };
}

export function mockGetProfilePublicationRevenueResponse(args: {
  variables: GetProfilePublicationRevenueVariables;
  items: PublicationRevenue[];
}): MockedResponse<GetProfilePublicationRevenueData> {
  return {
    request: {
      query: GetProfilePublicationRevenueDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockProfilePublicationsForSaleResponse(args: {
  variables: ProfilePublicationsForSaleVariables;
  items: ContentPublication[];
}): MockedResponse<ProfilePublicationsForSaleData> {
  return {
    request: {
      query: ProfilePublicationsForSaleDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockWhoReactedPublicationResponse(args: {
  variables: WhoReactedPublicationVariables;
  items: Array<WhoReactedResult>;
}): MockedResponse<WhoReactedPublicationData> {
  return {
    request: {
      query: WhoReactedPublicationDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockProfileFollowRevenueResponse({
  variables,
  revenues,
}: {
  variables: ProfileFollowRevenueVariables;
  revenues: ProfileFollowRevenue;
}): MockedResponse<ProfileFollowRevenueData> {
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

export function mockSearchProfilesResponse(args: {
  variables: SearchProfilesVariables;
  items: Profile[];
}): MockedResponse<SearchProfilesData> {
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
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockExploreProfilesResponse(args: {
  variables: ExploreProfilesVariables;
  items: Array<Profile>;
}): MockedResponse<ExploreProfilesData> {
  return {
    request: {
      query: ExploreProfilesDocument,
      variables: args.variables,
    },
    result: {
      data: {
        result: {
          items: args.items,
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

export function mockSearchPublicationsResponse(args: {
  variables: SearchPublicationsVariables;
  items: Array<ContentPublication>;
}): MockedResponse<SearchPublicationsData> {
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
          pageInfo: mockPaginatedResultInfo({ totalCount: args.items.length }),
        },
      },
    },
  };
}

function mockGetPublicationData(
  publication: AnyPublication | null = mockPostFragment(),
): GetPublicationData {
  return {
    result: publication,
  };
}

export function mockGetPublicationResponse({
  variables,
  publication,
}: {
  variables: GetPublicationVariables;
  publication: AnyPublication | null;
}): MockedResponse<GetPublicationData> {
  return {
    request: {
      query: GetPublicationDocument,
      variables,
    },
    result: {
      data: mockGetPublicationData(publication),
    },
  };
}

export function mockEnabledModulesResponse({
  data = mockEnabledModulesFragment(),
}: {
  data?: EnabledModules;
} = {}): MockedResponse<EnabledModulesData> {
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

export function mockGetProfileBookmarksResponse({
  variables,
  publications,
}: {
  variables: GetProfileBookmarksVariables;
  publications: ContentPublication[];
}): MockedResponse<GetProfileBookmarksData> {
  return {
    request: {
      query: GetProfileBookmarksDocument,
      variables,
    },
    result: {
      data: {
        result: {
          items: publications,
          pageInfo: mockPaginatedResultInfo(),
        },
      },
    },
  };
}
