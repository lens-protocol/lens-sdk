import { faker } from '@faker-js/faker';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { ChainType, Erc20, Erc20Amount, URI } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';

import * as gql from '../graphql/generated';
import { AnyPublication } from '../publication';

export function mockNetworkAddressFragment(
  overrides?: Partial<gql.NetworkAddress>,
): gql.NetworkAddress {
  return {
    address: mockEvmAddress(),
    chainId: 1,
    ...overrides,
    __typename: 'NetworkAddress',
  };
}

function mockErc20FragmentFrom(erc20: Erc20): gql.Erc20 {
  return {
    __typename: 'Erc20',
    name: erc20.name,
    symbol: erc20.symbol,
    decimals: erc20.decimals,
    contract: mockNetworkAddressFragment({
      address: erc20.address,
      chainId: erc20.chainType === ChainType.ETHEREUM ? 1 : 137,
    }),
  };
}

export function mockAmountFragmentFrom(amount: Erc20Amount): gql.Amount {
  return {
    __typename: 'Amount',
    asset: mockErc20FragmentFrom(amount.asset),
    value: amount.toSignificantDigits(),
    rate: null,
  };
}

function mockOptimisticStatusResultFragment(
  overrides?: Partial<gql.OptimisticStatusResult>,
): gql.OptimisticStatusResult {
  return {
    value: true,
    isFinalisedOnchain: false,
    ...overrides,
    __typename: 'OptimisticStatusResult',
  };
}

function mockProfileOperationsFragment(
  overrides?: Partial<gql.ProfileOperations>,
): gql.ProfileOperations {
  return {
    canBlock: false,
    canUnblock: false,
    canFollow: gql.TriStateValue.Unknown,
    canUnfollow: false,
    hasBlockedMe: mockOptimisticStatusResultFragment(),
    id: mockProfileId(),
    isBlockedByMe: mockOptimisticStatusResultFragment(),
    isFollowedByMe: mockOptimisticStatusResultFragment(),
    isFollowingMe: mockOptimisticStatusResultFragment(),
    ...overrides,
    __typename: 'ProfileOperations',
  };
}

function mockProfileOnchainIdentityFragment(
  overrides?: Partial<gql.ProfileOnchainIdentity>,
): gql.ProfileOnchainIdentity {
  return {
    proofOfHumanity: false,
    ens: null,
    sybilDotOrg: {
      verified: true,
      source: {
        twitter: {
          handle: null,
        },
      },
    },
    worldcoin: {
      isHuman: false,
    },
    ...overrides,
    __typename: 'ProfileOnchainIdentity',
  };
}

export function mockHandleInfo(): gql.HandleInfo {
  const localName = faker.internet.userName();
  const namespace = faker.internet.domainWord();
  return {
    id: `${namespace}/${localName}}`,
    fullHandle: `${localName}/${namespace}`,
    namespace,
    localName,
    ownedBy: mockEvmAddress(),
    suggestedFormatted: {
      full: `${namespace}/@${localName}`,
      localName: `@${localName}`,
    },
    linkedTo: {
      nftTokenId: '1',
      contract: mockNetworkAddressFragment(),
    },
    __typename: 'HandleInfo',
  };
}

export function mockProfileFragment(overrides?: Partial<gql.Profile>): gql.Profile {
  return {
    id: mockProfileId(),
    txHash: mockTransactionHash(),
    createdAt: faker.date.past().toISOString(),
    interests: [],
    handle: mockHandleInfo(),
    invitesLeft: 0,
    sponsor: false,
    signless: false,
    ownedBy: mockNetworkAddressFragment(),
    operations: mockProfileOperationsFragment(),
    guardian: null,
    onchainIdentity: mockProfileOnchainIdentityFragment(),
    followNftAddress: mockNetworkAddressFragment(),
    followModule: null,
    metadata: null,
    invitedBy: null,
    stats: mockProfileStatsFragment(),
    globalStats: mockProfileStatsFragment(),
    peerToPeerRecommendedByMe: false,

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockPostFragment(overrides?: Partial<Omit<gql.Post, '__typename'>>): gql.Post {
  const publicationId = mockPublicationId();
  const stats = mockPublicationStatsFragment({ id: publicationId });

  return {
    id: publicationId,
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    operations: mockPublicationOperationsFragment(),
    metadata: mockPublicationTextOnlyMetadata(),
    openActionModules: [],
    referenceModule: null,
    stats,
    globalStats: stats,
    isEncrypted: false,
    hashtagsMentioned: [],
    profilesMentioned: [],

    ...overrides,
    __typename: 'Post',
  };
}

export function mockCommentFragment(
  overrides?: Partial<Omit<gql.Comment, '__typename'>>,
): gql.Comment {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    isHidden: false,
    hiddenByAuthor: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    operations: mockPublicationOperationsFragment(),
    metadata: mockPublicationTextOnlyMetadata(),
    openActionModules: [],
    referenceModule: null,
    root: mainPost,
    commentOn: mainPost,
    firstComment: null,
    stats: mockPublicationStatsFragment(),
    globalStats: mockPublicationStatsFragment(),
    isEncrypted: false,
    hashtagsMentioned: [],
    profilesMentioned: [],

    ...overrides,
    __typename: 'Comment',
  };
}

export function mockQuoteFragment(overrides?: Partial<Omit<gql.Quote, '__typename'>>): gql.Quote {
  return {
    id: mockPublicationId(),
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    operations: mockPublicationOperationsFragment(),
    metadata: mockPublicationTextOnlyMetadata(),
    openActionModules: [],
    referenceModule: null,
    quoteOn: mockPostFragment(),
    stats: mockPublicationStatsFragment(),
    globalStats: mockPublicationStatsFragment(),
    isEncrypted: false,
    hashtagsMentioned: [],
    profilesMentioned: [],

    ...overrides,
    __typename: 'Quote',
  };
}

export function mockUnknownReferenceModuleSettings(
  overrides?: Partial<gql.UnknownReferenceModuleSettings>,
): gql.UnknownReferenceModuleSettings {
  return {
    contract: mockNetworkAddressFragment(),
    signlessApproved: true,
    sponsoredApproved: true,
    initializeCalldata: null,
    initializeResultData: null,
    verified: false,
    ...overrides,
    __typename: 'UnknownReferenceModuleSettings',
  };
}

export function mockMirrorFragment(
  overrides?: Partial<Omit<gql.Mirror, '__typename'>>,
): gql.Mirror {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    isHidden: false,
    txHash: mockTransactionHash(),
    by: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    publishedOn: null,
    momoka: null,
    mirrorOn: mainPost,
    ...overrides,
    __typename: 'Mirror',
  };
}

export function mockPublicationTextOnlyMetadata(
  overrides: Partial<gql.TextOnlyMetadataV3> = {},
): gql.TextOnlyMetadataV3 {
  return {
    id: faker.helpers.unique(faker.datatype.uuid),
    rawURI: faker.internet.url() as URI,
    locale: 'en',
    tags: null,
    contentWarning: null,
    hideFromFeed: false,
    appId: null,
    content: faker.lorem.words(5),
    marketplace: null,
    attributes: null,
    encryptedWith: null,

    ...overrides,
    __typename: 'TextOnlyMetadataV3',
  };
}

function mockCanDecryptResponseFragment(
  overrides?: Partial<gql.ProfileOperations>,
): gql.CanDecryptResponse {
  return {
    result: false,
    reasons: null,
    extraDetails: null,
    ...overrides,
    __typename: 'CanDecryptResponse',
  };
}

export function mockPublicationOperationsFragment(
  overrides: Partial<gql.PublicationOperations> = {},
): gql.PublicationOperations {
  return {
    id: mockPublicationId(),
    isNotInterested: false,
    hasBookmarked: false,
    hasReported: false,
    canCollect: gql.TriStateValue.Unknown,
    canComment: gql.TriStateValue.Unknown,
    canMirror: gql.TriStateValue.Unknown,
    canQuote: gql.TriStateValue.Unknown,
    hasMirrored: false,
    hasQuoted: false,
    hasUpvoted: false,
    hasDownvoted: false,
    hasCollected: mockOptimisticStatusResultFragment(),
    canDecrypt: mockCanDecryptResponseFragment(),

    ...overrides,
    __typename: 'PublicationOperations',
  };
}

export function mockPaginatedResultInfo(
  overrides: Partial<gql.PaginatedResultInfo> = {},
): gql.PaginatedResultInfo {
  return {
    prev: null,
    next: null,
    ...overrides,
    __typename: 'PaginatedResultInfo',
  };
}

export function mockPublicationStatsFragment(
  overrides: Partial<gql.PublicationStats> = {},
): gql.PublicationStats {
  return {
    id: mockPublicationId(),
    comments: faker.datatype.number(),
    mirrors: faker.datatype.number(),
    quotes: faker.datatype.number(),
    bookmarks: faker.datatype.number(),
    collects: faker.datatype.number(),
    upvotes: faker.datatype.number(),
    downvotes: faker.datatype.number(),

    ...overrides,
    __typename: 'PublicationStats',
  };
}

export function mockProfileStatsFragment(
  overrides: Partial<gql.ProfileStats> = {},
): gql.ProfileStats {
  return {
    id: mockProfileId(),
    followers: faker.datatype.number(),
    following: faker.datatype.number(),
    comments: faker.datatype.number(),
    posts: faker.datatype.number(),
    mirrors: faker.datatype.number(),
    quotes: faker.datatype.number(),
    publications: faker.datatype.number(),
    collects: faker.datatype.number(),
    upvotes: faker.datatype.number(),
    downvotes: faker.datatype.number(),
    upvoted: faker.datatype.number(),
    downvoted: faker.datatype.number(),
    lensClassifierScore: 0,

    ...overrides,
    __typename: 'ProfileStats',
  };
}

export function mockFeedItemFragment(overrides?: Partial<gql.FeedItem>): gql.FeedItem {
  return {
    id: faker.datatype.uuid(),
    root: mockPostFragment(),
    comments: [],
    mirrors: [],
    reactions: [],

    ...overrides,
    __typename: 'FeedItem',
  };
}

export function mockProfileActionHistoryFragment(
  overrides: Partial<gql.ProfileActionHistory> = {},
): gql.ProfileActionHistory {
  return {
    id: faker.datatype.number(),
    actionType: gql.ProfileActionHistoryType.LoggedIn,
    who: mockEvmAddress(),
    txHash: mockTransactionHash(),
    actionedOn: faker.date.past().toISOString(),

    ...overrides,

    __typename: 'ProfileActionHistory',
  };
}

export function mockMentionNotification(
  overrides?: Partial<gql.MentionNotification>,
): gql.MentionNotification {
  return {
    __typename: 'MentionNotification',
    id: faker.datatype.uuid(),
    publication: mockPostFragment(),
    ...overrides,
  };
}

export function mockProfileReactionResultFragment(
  overrides: Partial<gql.ProfileReactionResult> = {},
): gql.ProfileReactionResult {
  return {
    reaction: gql.PublicationReactionType.Upvote,
    reactionAt: faker.date.past().toISOString(),

    ...overrides,
    __typename: 'ProfileReactionResult',
  };
}

export function mockProfileWhoReactedResultFragment(
  overrides: Partial<gql.ProfileWhoReactedResult> = {},
): gql.ProfileWhoReactedResult {
  return {
    profile: mockProfileFragment(),
    reactions: [mockProfileReactionResultFragment()],

    ...overrides,
    __typename: 'ProfileWhoReactedResult',
  };
}

export function mockErc20Fragment(overrides: Partial<gql.Erc20> = {}): gql.Erc20 {
  return {
    name: 'Wrapped MATIC',
    symbol: 'WMATIC',
    decimals: 18,
    contract: mockNetworkAddressFragment(),
    ...overrides,
    __typename: 'Erc20',
  };
}

export function mockAmountFragment(overrides: Partial<gql.Amount> = {}): gql.Amount {
  return {
    value: faker.datatype.number().toString(),
    asset: mockErc20Fragment(),
    rate: null,
    ...overrides,
    __typename: 'Amount',
  };
}

export function mockRevenueAggregateFragment(
  overrides: Partial<gql.RevenueAggregate> = {},
): gql.RevenueAggregate {
  return {
    total: mockAmountFragment(),
    ...overrides,
    __typename: 'RevenueAggregate',
  };
}

export function mockPublicationRevenueFragment({
  publication = mockPostFragment(),
}: {
  publication?: AnyPublication;
} = {}): gql.PublicationRevenue {
  return {
    __typename: 'PublicationRevenue',
    publication: publication,
    revenue: [mockRevenueAggregateFragment()],
  };
}

export function mockFeeFollowModuleSettingsFragment(
  overrides?: Partial<gql.FeeFollowModuleSettings>,
): gql.FeeFollowModuleSettings {
  return mock<gql.FeeFollowModuleSettings>({
    ...overrides,
    __typename: 'FeeFollowModuleSettings',
  });
}

export function mockSimpleCollectOpenActionSettingsFragment(
  overrides?: Partial<gql.SimpleCollectOpenActionSettings>,
) {
  return mock<gql.SimpleCollectOpenActionSettings>({
    ...overrides,
    __typename: 'SimpleCollectOpenActionSettings',
  });
}

export function mockMultirecipientFeeCollectOpenActionSettingsFragment(
  overrides?: Partial<gql.MultirecipientFeeCollectOpenActionSettings>,
) {
  return mock<gql.MultirecipientFeeCollectOpenActionSettings>({
    ...overrides,
    __typename: 'MultirecipientFeeCollectOpenActionSettings',
  });
}

export function mockUnknownOpenActionModuleSettingsFragment(
  overrides?: Partial<gql.UnknownOpenActionModuleSettings>,
) {
  return mock<gql.UnknownOpenActionModuleSettings>({
    contract: mockNetworkAddressFragment(),
    ...overrides,
    __typename: 'UnknownOpenActionModuleSettings',
  });
}

export function mockLegacyFreeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyFreeCollectModuleSettings>,
) {
  return mock<gql.LegacyFreeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyFreeCollectModuleSettings',
  });
}

export function mockLegacyFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyFeeCollectModuleSettings',
  });
}

export function mockLegacyLimitedFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyLimitedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyLimitedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyLimitedFeeCollectModuleSettings',
  });
}

export function mockLegacyLimitedTimedFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyLimitedTimedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyLimitedTimedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyLimitedTimedFeeCollectModuleSettings',
  });
}

export function mockLegacyRevertCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyRevertCollectModuleSettings>,
) {
  return mock<gql.LegacyRevertCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyRevertCollectModuleSettings',
  });
}

export function mockLegacyTimedFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyTimedFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyTimedFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyTimedFeeCollectModuleSettings',
  });
}

export function mockLegacyMultirecipientFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyMultirecipientFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyMultirecipientFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyMultirecipientFeeCollectModuleSettings',
  });
}

export function mockLegacySimpleCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacySimpleCollectModuleSettings>,
) {
  return mock<gql.LegacySimpleCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacySimpleCollectModuleSettings',
  });
}

export function mockLegacyErc4626FeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyErc4626FeeCollectModuleSettings>,
) {
  return mock<gql.LegacyErc4626FeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyERC4626FeeCollectModuleSettings',
  });
}

export function mockLegacyAaveFeeCollectModuleSettingsFragment(
  overrides?: Partial<gql.LegacyAaveFeeCollectModuleSettings>,
) {
  return mock<gql.LegacyAaveFeeCollectModuleSettings>({
    ...overrides,
    __typename: 'LegacyAaveFeeCollectModuleSettings',
  });
}

export function mockModuleMetadataFragment(
  overrides?: Partial<gql.ModuleMetadata>,
): gql.ModuleMetadata {
  return {
    __typename: 'ModuleMetadata',
    authors: [],
    description: '',
    initializeCalldataABI: '[]',
    initializeResultDataABI: null,
    name: '',
    processCalldataABI: '[]',
    title: '',
    attributes: [],
    ...overrides,
  };
}

export function mockModuleMetadataResultFragment(
  overrides?: Partial<gql.ModuleMetadataResult>,
): gql.ModuleMetadataResult {
  return {
    metadata: mockModuleMetadataFragment(),
    moduleType: gql.ModuleType.Follow,
    signlessApproved: true,
    sponsoredApproved: true,
    verified: true,
    ...overrides,
    __typename: 'GetModuleMetadataResult',
  };
}
