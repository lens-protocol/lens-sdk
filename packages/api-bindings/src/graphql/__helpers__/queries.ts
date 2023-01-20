import { MockedResponse } from '@apollo/client/testing';
import { ProfileId } from '@lens-protocol/domain/entities';
import { Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  CommentFragment,
  CommentWithFirstCommentFragment,
  CommonPaginatedResultInfoFragment,
  CreateCommentTypedDataDocument,
  CreateCommentTypedDataMutation,
  CreateCommentTypedDataMutationVariables,
  CreateCommentViaDispatcherDocument,
  CreateCommentViaDispatcherMutation,
  CreateCommentViaDispatcherMutationVariables,
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePostViaDispatcherDocument,
  CreatePostViaDispatcherMutation,
  CreatePostViaDispatcherMutationVariables,
  EnabledModuleCurrenciesDocument,
  EnabledModuleCurrenciesQuery,
  EnabledModulesDocument,
  EnabledModulesFragment,
  EnabledModulesQuery,
  ExplorePublicationsDocument,
  ExplorePublicationsQuery,
  ExplorePublicationsQueryVariables,
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
  MirrorFragment,
  MutualFollowersProfilesDocument,
  MutualFollowersProfilesQuery,
  MutualFollowersProfilesQueryVariables,
  PostFragment,
  ProfileFieldsFragment,
  ProfileFollowRevenueDocument,
  ProfileFollowRevenueFragment,
  ProfileFollowRevenueQuery,
  ProfileFollowRevenueQueryVariables,
  ProfilePublicationRevenueDocument,
  ProfilePublicationRevenueQuery,
  ProfilePublicationRevenueQueryVariables,
  ProfilesToFollowDocument,
  ProfilesToFollowQuery,
  ProxyActionError,
  ProxyActionStatusDocument,
  ProxyActionStatusQuery,
  ProxyActionStatusQueryVariables,
  ProxyActionStatusResult,
  ProxyActionStatusTypes,
  PublicationByTxHashDocument,
  PublicationByTxHashQuery,
  PublicationDocument,
  PublicationQuery,
  PublicationRevenueDocument,
  PublicationRevenueFragment,
  PublicationRevenueQuery,
  PublicationRevenueQueryVariables,
  PublicationsDocument,
  PublicationsQuery,
  PublicationsQueryVariables,
  RevenueFragment,
  SearchProfilesDocument,
  SearchProfilesQuery,
  SearchProfilesQueryVariables,
  SearchPublicationsDocument,
  SearchPublicationsQuery,
  SearchPublicationsQueryVariables,
  SingleProfileQueryRequest,
  TransactionErrorReasons,
  WhoReactedPublicationDocument,
  WhoReactedPublicationQuery,
  WhoReactedPublicationQueryVariables,
  WhoReactedResultFragment,
} from '../generated';
import {
  mockEnabledModulesFragment,
  mockFeedItemFragment,
  mockPostFragment,
  mockProfileFieldsFragment,
} from './fragments';

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
  address,
  profiles = [mockProfileFieldsFragment()],
  observerId,
  limit = 10,
  cursor,
}: {
  address: EthereumAddress;
  profiles?: ProfileFieldsFragment[];
  observerId?: string;
  limit?: number;
  cursor?: string;
}): MockedResponse<GetAllProfilesByOwnerAddressQuery> {
  return {
    request: {
      query: GetAllProfilesByOwnerAddressDocument,
      variables: {
        address,
        observerId,
        limit,
        cursor,
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

export function createMutualFollowersQueryMockedResponse(args: {
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

export function createPublicationRevenueQueryMockedResponse(args: {
  variables: PublicationRevenueQueryVariables;
  revenue: RevenueFragment;
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
  items: ProfileFieldsFragment[];
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

export function createSearchPublicationsQueryMockedResponse(args: {
  variables: SearchPublicationsQueryVariables;
  items: Array<CommentFragment | PostFragment>;
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
  publication,
  observerId,
  txHash,
}: {
  publication: CommentWithFirstCommentFragment | PostFragment | MirrorFragment;
  observerId?: ProfileId;
  txHash: string;
}): MockedResponse<PublicationByTxHashQuery> {
  return {
    request: {
      query: PublicationByTxHashDocument,
      variables: { txHash, observerId },
    },
    result: {
      data: mockPublicationByTxHash(publication),
    },
  };
}

export function createCreateCommentTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCommentTypedDataMutationVariables;
  data: CreateCommentTypedDataMutation;
}): MockedResponse<CreateCommentTypedDataMutation> {
  return {
    request: {
      query: CreateCommentTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreateCommentViaDispatcherMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreateCommentViaDispatcherMutationVariables;
  data: CreateCommentViaDispatcherMutation;
}): MockedResponse<CreateCommentViaDispatcherMutation> {
  return {
    request: {
      query: CreateCommentViaDispatcherDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreatePostTypedDataMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreatePostTypedDataMutationVariables;
  data: CreatePostTypedDataMutation;
}): MockedResponse<CreatePostTypedDataMutation> {
  return {
    request: {
      query: CreatePostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function createCreatePostViaDispatcherMutationMockedResponse({
  variables,
  data,
}: {
  variables: CreatePostViaDispatcherMutationVariables;
  data: CreatePostViaDispatcherMutation;
}): MockedResponse<CreatePostViaDispatcherMutation> {
  return {
    request: {
      query: CreatePostViaDispatcherDocument,
      variables,
    },
    result: {
      data,
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
