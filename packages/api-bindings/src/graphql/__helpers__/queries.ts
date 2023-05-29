import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { AppId } from '@lens-protocol/domain/entities';
import { Erc20 } from '@lens-protocol/shared-kernel';

import {
  EnabledModuleCurrenciesDocument,
  EnabledModulesDocument,
  ExploreProfilesDocument,
  ExplorePublicationsDocument,
  FeedDocument,
  GetAllProfilesDocument,
  GetProfileDocument,
  GetProfilePublicationRevenueDocument,
  GetPublicationDocument,
  GetPublicationRevenueDocument,
  GetPublicationsDocument,
  HasTxHashBeenIndexedDocument,
  MutualFollowersProfilesDocument,
  ProfileFollowRevenueDocument,
  ProfilePublicationsForSaleDocument,
  ProfilesToFollowDocument,
  ProxyActionStatusDocument,
  SearchProfilesDocument,
  SearchPublicationsDocument,
  WhoCollectedPublicationDocument,
  WhoReactedPublicationDocument,
} from '../hooks';
import { Cursor, SearchProfilesResult, SearchPublicationsResult } from '../index';
import {
  Comment,
  EnabledModuleCurrenciesData,
  EnabledModules,
  EnabledModulesData,
  ExploreProfilesData,
  ExploreProfilesVariables,
  ExplorePublicationsData,
  ExplorePublicationsVariables,
  FeedData,
  FeedItem,
  FeedVariables,
  GetAllProfilesData,
  GetAllProfilesVariables,
  GetProfileData,
  GetProfilePublicationRevenueData,
  GetProfilePublicationRevenueVariables,
  GetProfileVariables,
  GetPublicationData,
  GetPublicationRevenueData,
  GetPublicationRevenueVariables,
  GetPublicationsData,
  GetPublicationsVariables,
  GetPublicationVariables,
  HasTxHashBeenIndexedData,
  HasTxHashBeenIndexedVariables,
  Maybe,
  Mirror,
  MutualFollowersProfilesData,
  MutualFollowersProfilesVariables,
  Post,
  Profile,
  ProfileFollowRevenue,
  ProfileFollowRevenueData,
  ProfileFollowRevenueVariables,
  ProfilePublicationsForSaleData,
  ProfilePublicationsForSaleVariables,
  ProfilesToFollowData,
  ProfilesToFollowVariables,
  ProxyActionError,
  ProxyActionStatusData,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  ProxyActionStatusVariables,
  PublicationRevenue,
  SearchProfilesVariables,
  SearchPublicationsVariables,
  TransactionErrorReasons,
  Wallet,
  WhoCollectedPublicationData,
  WhoCollectedPublicationVariables,
  WhoReactedPublicationData,
  WhoReactedPublicationVariables,
  WhoReactedResult,
} from '../operations';
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

export function createProfilesToFollowMockedResponse({
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

export function createGetProfileMockedResponse({
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

export function createGetAllProfilesMockedResponse({
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

export function createHasTxHashBeenIndexedMockedResponse({
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

export function createProxyActionStatusMockedResponse(instructions: {
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

export function createEnabledModuleCurrenciesMockedResponse(
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

export function createWhoCollectedPublicationMockedResponse(args: {
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

export function createMutualFollowersMockedResponse(args: {
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

export function createGetPublicationsMockedResponse(args: {
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

export function createFeedMockedResponse(args: {
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

export function createExplorePublicationsMockedResponse(args: {
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

export function createGetPublicationRevenueMockedResponse(args: {
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

export function createGetProfilePublicationRevenueMockedResponse(args: {
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

export function createProfilePublicationsForSaleMockedResponse(args: {
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

export function createWhoReactedPublicationMockedResponse(args: {
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

export function createProfileFollowRevenueMockedResponse({
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

export function createSearchProfilesMockedResponse(args: {
  variables: SearchProfilesVariables;
  items: Profile[];
}): MockedResponse<SearchProfilesResult> {
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

export function createExploreProfilesMockedResponse(args: {
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

export function createSearchPublicationsMockedResponse(args: {
  variables: SearchPublicationsVariables;
  items: Array<ContentPublication>;
}): MockedResponse<SearchPublicationsResult> {
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

export function createGetPublicationMockedResponse({
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

export function createEnabledModulesMockedResponse({
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
