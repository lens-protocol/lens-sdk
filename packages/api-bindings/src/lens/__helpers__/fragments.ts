import { faker } from '@faker-js/faker';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import {
  CollectPolicyType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { Erc20Amount } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { CollectState, NoFeeCollectPolicy } from '../CollectPolicy';
import { ContentEncryptionKey } from '../ContentEncryptionKey';
import { FollowPolicy } from '../FollowPolicy';
import { ProfileAttributes } from '../ProfileAttributes';
import {
  AnyConditionOutput,
  Attribute,
  CollectConditionOutput,
  Comment,
  ContractType,
  DataAvailabilityPublicationResult,
  EnabledModule,
  EnabledModules,
  EncryptedFieldsOutput,
  EncryptionParamsOutput,
  EncryptionProvider,
  EoaOwnershipOutput,
  Erc20AmountFields,
  Erc20Fields,
  Erc20OwnershipOutput,
  FeedItem,
  FollowConditionOutput,
  LeafConditionOutput,
  Media,
  MetadataOutput,
  Mirror,
  ModuleInfo,
  NftOwnershipOutput,
  PaginatedResultInfo,
  Post,
  Profile,
  ProfileFollowRevenue,
  ProfileOwnershipOutput,
  ProfileStats,
  PublicationMainFocus,
  PublicationRevenue,
  PublicationStats,
  ReactionTypes,
  RelayerResult,
  RelayError,
  RelayErrorReasons,
  RevenueAggregate,
  RootConditionOutput,
  ScalarOperator,
  Wallet,
  WhoReactedResult,
} from '../generated';
import {
  AnyPublication,
  CollectModule,
  erc20Amount,
  ProfileCoverMedia,
  ProfilePictureMedia,
} from '../utils';

export function mockMediaFragment(overrides?: Partial<Media>): Media {
  return {
    altTag: faker.lorem.sentence(),
    cover: faker.image.imageUrl(),
    mimeType: 'image/jpeg',
    url: faker.image.imageUrl(),
    ...overrides,
    __typename: 'Media',
  };
}

export function mockProfilePictureMediaFragment(
  overrides?: Partial<ProfilePictureMedia>,
): ProfilePictureMedia {
  return {
    original: mockMediaFragment(),
    optimized: mockMediaFragment(),
    thumbnail: mockMediaFragment(),
    ...overrides,
    __typename: 'MediaSet',
  };
}

export function mockProfileCoverPictureMediaFragment(
  overrides?: Partial<ProfileCoverMedia>,
): ProfileCoverMedia {
  return {
    original: mockMediaFragment(),
    optimized: mockMediaFragment(),
    ...overrides,
    __typename: 'MediaSet',
  };
}

export function mockAttributeFragment(overrides?: Partial<Attribute>): Attribute {
  return {
    key: 'answer',
    value: '42',
    displayType: 'string',
    ...overrides,
    __typename: 'Attribute',
  };
}

export function mockAnyoneFollowPolicy(): FollowPolicy {
  return {
    type: FollowPolicyType.ANYONE,
  };
}

export function mockWalletFragment(): Wallet {
  return {
    __typename: 'Wallet',
    defaultProfile: mockProfileFragment(),
    address: mockEthereumAddress(),
  };
}

export function mockProfileStatsFragment(overrides?: Partial<ProfileStats>): ProfileStats {
  return {
    totalCollects: 0,
    totalComments: 0,
    totalFollowers: 0,
    totalFollowing: 0,
    totalMirrors: 0,
    totalPosts: 0,
    totalPublications: 0,
    commentsCount: 0,
    mirrorsCount: 0,
    postsCount: 0,
    ...overrides,
    __typename: 'ProfileStats',
  };
}

export function mockProfileFragment(overrides?: Partial<Profile>): Profile {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: mockProfileId(),
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentence(),
    handle: faker.internet.userName(firstName, lastName),
    ownedBy: mockEthereumAddress(),
    interests: [],
    picture: mockProfilePictureMediaFragment(),
    coverPicture: mockProfileCoverPictureMediaFragment(),

    stats: mockProfileStatsFragment(overrides?.stats),

    dispatcher: null,

    onChainIdentity: {
      proofOfHumanity: false,
      ens: null,
      sybilDotOrg: {
        verified: false,
        source: {
          twitter: {
            handle: null,
          },
        },
      },
      worldcoin: {
        isHuman: false,
      },
    },

    followModule: null,
    followPolicy: mockAnyoneFollowPolicy(),

    isFollowedByMe: false,
    isFollowingObserver: false,
    followStatus: null,

    ownedByMe: false,

    __attributes: [],
    attributes: {} as ProfileAttributes,

    invitedBy: null,

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockRelayerResultFragment(txHash: string = mockTransactionHash()): RelayerResult {
  return {
    __typename: 'RelayerResult',
    txHash,
    txId: faker.datatype.uuid(),
  };
}

export function mockRelayErrorFragment(reason: RelayErrorReasons): RelayError {
  return {
    __typename: 'RelayError',
    reason,
  };
}

export function mockDataAvailabilityPublicationResult(): DataAvailabilityPublicationResult {
  return {
    id: mockPublicationId(),
    dataAvailabilityId: faker.datatype.uuid(),
    __typename: 'CreateDataAvailabilityPublicationResult',
  };
}

export function mockPublicationStatsFragment(
  overrides?: Partial<PublicationStats>,
): PublicationStats {
  return {
    totalAmountOfMirrors: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfCollects: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalAmountOfComments: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalUpvotes: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    totalDownvotes: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    commentsCount: faker.datatype.number({ max: 42000, min: 0, precision: 1 }),
    ...overrides,
    __typename: 'PublicationStats',
  };
}

export function mockEncryptedFieldsOutputFragment(
  overrides?: Partial<EncryptedFieldsOutput>,
): EncryptedFieldsOutput {
  return {
    animation_url: null,
    content: null,
    external_url: null,
    image: null,
    media: null,
    ...overrides,
    __typename: 'EncryptedFieldsOutput',
  };
}

export function mockFreeCollectModuleSettings({ followerOnly = false } = {}): CollectModule {
  return {
    __typename: 'FreeCollectModuleSettings',
    contractAddress: '0x96351D3cE872903EBf4c2D77dd625992CCFdf8c9',
    followerOnly,
  };
}

// Use this to test the handling of collect modules that are already whitelisted by backend but not yet support by sdk
export function mockNotYetKnownCollectModuleSettings(): CollectModule {
  return {
    __typename: 'NotYetKnownCollectModuleSettings',
  } as unknown as CollectModule;
}

export function mockMetadataOutputFragment(overrides?: Partial<MetadataOutput>): MetadataOutput {
  return {
    animatedUrl: faker.internet.url(),
    attributes: [],
    content: faker.lorem.words(5),
    contentWarning: null,
    description: null,
    encryptionParams: null,
    image: faker.internet.url(),
    locale: null,
    mainContentFocus: PublicationMainFocus.TextOnly,
    media: [],
    name: faker.commerce.productName(),
    tags: [],

    ...overrides,
    __typename: 'MetadataOutput',
  };
}

function mockNoFeeCollectPolicy(overrides?: Partial<NoFeeCollectPolicy>): NoFeeCollectPolicy {
  return {
    type: CollectPolicyType.FREE,
    state: CollectState.CAN_BE_COLLECTED,
    followerOnly: false,
    collectNftAddress: mockEthereumAddress(),
    contractAddress: mockEthereumAddress(),
    endTimestamp: null,
    collectLimit: null,
    ...overrides,
  };
}

export function mockPostFragment(overrides?: Partial<Omit<Post, '__typename'>>): Post {
  return {
    id: mockPublicationId(),
    createdAt: faker.datatype.datetime().toISOString(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataOutputFragment(),
    profile: mockProfileFragment(),
    collectedBy: null,
    collectModule: mockFreeCollectModuleSettings(),
    collectNftAddress: mockEthereumAddress(),
    collectPolicy: mockNoFeeCollectPolicy(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    isMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,

    isGated: false,
    decryptionCriteria: null,

    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    canObserverDecrypt: {
      result: true,
      reasons: null,
    },
    referencePolicy: {
      type: ReferencePolicyType.ANYONE,
    },
    ...overrides,
    __typename: 'Post',
  } as Post;
}

export function mockCommentFragment(overrides?: Partial<Omit<Comment, '__typename'>>): Comment {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataOutputFragment(),
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    collectedBy: null,
    commentOn: mainPost,
    mainPost: mainPost,
    collectModule: mockFreeCollectModuleSettings(),
    collectNftAddress: mockEthereumAddress(),
    collectPolicy: mockNoFeeCollectPolicy(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
    isMirroredByMe: false,
    mirrors: [],
    reaction: null,
    hidden: false,

    isGated: false,
    decryptionCriteria: null,

    canComment: {
      result: true,
    },
    canMirror: {
      result: true,
    },
    canObserverDecrypt: {
      result: false,
      reasons: null,
    },
    referencePolicy: {
      type: ReferencePolicyType.ANYONE,
    },
    firstComment: null,
    ...overrides,
    __typename: 'Comment',
  } as Comment;
}

export function mockMirrorFragment(overrides?: Partial<Omit<Mirror, '__typename'>>): Mirror {
  const mainPost = mockPostFragment();

  return {
    id: mockPublicationId(),
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    mirrorOf: mainPost,
    hidden: false,
    ...overrides,
    __typename: 'Mirror',
  };
}

export function mockFeedItemFragment(overrides?: Partial<FeedItem>): FeedItem {
  return {
    root: mockPostFragment(),
    comments: null,
    mirrors: [],
    electedMirror: null,
    reactions: [],
    collects: [],
    ...overrides,
    __typename: 'FeedItem',
  };
}

function mockErc20FieldsFragment(
  overrides?: Partial<Omit<Erc20Fields, '__typename'>>,
): Erc20Fields {
  return {
    __typename: 'Erc20',
    name: 'Wrapped MATIC',
    symbol: 'WMATIC',
    decimals: 18,
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockErc20AmountFieldsFragment(amount = mockDaiAmount(42)): Erc20AmountFields {
  return {
    __typename: 'Erc20Amount',
    asset: mockErc20FieldsFragment({
      name: amount.asset.name,
      symbol: amount.asset.symbol,
      decimals: amount.asset.decimals,
      address: amount.asset.address,
    }),
    value: amount.toSignificantDigits(),
  };
}

function mockRevenueAggregateFragment(amount?: Erc20Amount): RevenueAggregate {
  const total = mockErc20AmountFieldsFragment(amount);
  return {
    __typename: 'RevenueAggregate',
    __total: total,
    totalAmount: erc20Amount({ from: total }),
  };
}

export function mockPublicationRevenueFragment({
  publication = mockPostFragment(),
  amount,
}: {
  publication?: AnyPublication;
  amount?: Erc20Amount;
} = {}): PublicationRevenue {
  return {
    __typename: 'PublicationRevenue',
    publication: publication,
    revenue: mockRevenueAggregateFragment(amount),
  };
}

export function mockProfileFollowRevenueFragment({
  amount,
}: {
  amount?: Erc20Amount;
} = {}): ProfileFollowRevenue {
  return {
    __typename: 'FollowRevenueResult',
    revenues: [mockRevenueAggregateFragment(amount)],
  };
}

export function mockWhoReactedResultFragment(
  overrides?: Partial<Omit<WhoReactedResult, '__typename'>>,
): WhoReactedResult {
  return {
    __typename: 'WhoReactedResult',
    reactionId: faker.datatype.uuid(),
    reaction: ReactionTypes.Upvote,
    reactionAt: faker.date.past().toISOString(),
    profile: mockProfileFragment(),
    ...overrides,
  };
}

export function mockModuleInfoFragment(
  overrides?: Partial<Omit<ModuleInfo, '__typename'>>,
): ModuleInfo {
  return {
    __typename: 'ModuleInfo',
    name: faker.datatype.string(),
    type: faker.datatype.string(),
    ...overrides,
  };
}

export function mockEnabledModuleFragment(
  overrides?: Partial<Omit<EnabledModule, '__typename'>>,
): EnabledModule {
  return {
    __typename: 'EnabledModule',
    moduleName: faker.datatype.string(),
    contractAddress: mockEthereumAddress(),
    inputParams: [mockModuleInfoFragment()],
    redeemParams: [mockModuleInfoFragment()],
    returnDataParams: [mockModuleInfoFragment()],
    ...overrides,
  };
}

export function mockEnabledModulesFragment(
  overrides?: Partial<Omit<EnabledModules, '__typename'>>,
): EnabledModules {
  return {
    __typename: 'EnabledModules',
    collectModules: [mockEnabledModuleFragment()],
    followModules: [mockEnabledModuleFragment()],
    referenceModules: [mockEnabledModuleFragment()],
    ...overrides,
  };
}

export function mockNftOwnershipAccessCondition(
  overrides?: Partial<NftOwnershipOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    nft: {
      chainID: 1,
      contractAddress: mockEthereumAddress(),
      contractType: ContractType.Erc721,
      tokenIds: [faker.datatype.number().toString()],
      ...overrides,
      __typename: 'NftOwnershipOutput',
    },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockErc20OwnershipAccessCondition(
  overrides?: Partial<Erc20OwnershipOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    token: {
      amount: '100',
      chainID: 1,
      condition: ScalarOperator.Equal,
      contractAddress: mockEthereumAddress(),
      decimals: 18,
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      ...overrides,
      __typename: 'Erc20OwnershipOutput',
    },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
  };
}

export function mockEoaOwnershipAccessCondition(
  overrides?: Partial<EoaOwnershipOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    eoa: {
      address: mockEthereumAddress(),
      ...overrides,
      __typename: 'EoaOwnershipOutput',
    },
    and: null,
    collect: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockProfileOwnershipAccessCondition(
  overrides?: Partial<ProfileOwnershipOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    profile: {
      profileId: mockProfileId(),
      ...overrides,
      __typename: 'ProfileOwnershipOutput',
    },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    token: null,
  };
}

export function mockFollowConditionAccessCondition(
  overrides?: Partial<FollowConditionOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    follow: {
      profileId: mockProfileId(),
      ...overrides,
      __typename: 'FollowConditionOutput',
    },
    and: null,
    collect: null,
    eoa: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockCollectConditionAccessCondition(
  condition: Omit<CollectConditionOutput, '__typename'> = {
    publicationId: mockPublicationId(),
    thisPublication: null,
  },
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    collect: {
      ...condition,
      __typename: 'CollectConditionOutput',
    },
    and: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockOrAccessCondition(
  criteria: Array<AnyConditionOutput | LeafConditionOutput> = [],
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    or: { __typename: 'OrConditionOutput', criteria },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    profile: null,
    token: null,
  };
}

export function mockAndAccessCondition(
  criteria: Array<AnyConditionOutput | LeafConditionOutput> = [],
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    and: { __typename: 'AndConditionOutput', criteria },
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

function mockPublicationOwnerAccessCondition(
  overrides?: Partial<ProfileOwnershipOutput>,
): AnyConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    profile: { __typename: 'ProfileOwnershipOutput', profileId: mockProfileId(), ...overrides },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    token: null,
  };
}

function mockRootConditionFragment({
  others,
  ownerId,
}: {
  others: AnyConditionOutput[];
  ownerId: ProfileId;
}): RootConditionOutput {
  return {
    __typename: 'AccessConditionOutput',
    or: {
      criteria: [mockPublicationOwnerAccessCondition({ profileId: ownerId }), ...others],
    },
  };
}

export function mockEncryptionParamsOutputFragment({
  others,
  ownerId,
  encryptedFields = mockEncryptedFieldsOutputFragment(),
  encryptionKey = '0x123',
}: {
  others: AnyConditionOutput[];
  ownerId: ProfileId;
  encryptedFields?: EncryptedFieldsOutput;
  encryptionKey?: ContentEncryptionKey;
}): EncryptionParamsOutput {
  return {
    __typename: 'EncryptionParamsOutput',
    accessCondition: mockRootConditionFragment({
      others,
      ownerId,
    }),
    encryptionProvider: EncryptionProvider.LitProtocol,
    encryptedFields,
    providerSpecificParams: {
      encryptionKey,
    },
  };
}

export function mockPaginatedResultInfo(
  overrides: Partial<PaginatedResultInfo> = {},
): PaginatedResultInfo {
  return {
    __typename: 'PaginatedResultInfo',
    // moreAfter: false,
    // moreBefore: false,
    prev: null,
    next: null,
    totalCount: null,
    ...overrides,
  } as PaginatedResultInfo;
}
