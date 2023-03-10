import { faker } from '@faker-js/faker';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId, mockTransactionHash } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import {
  CollectPolicyType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { Amount, Erc20 } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { CollectState, NoFeeCollectPolicy } from '../CollectPolicy';
import { ContentEncryptionKey } from '../ContentEncryptionKey';
import { FollowPolicy } from '../FollowPolicy';
import { ProfileAttributes } from '../ProfileAttributes';
import {
  AttributeFragment,
  CollectConditionOutput,
  CollectModuleFragment,
  CommentFragment,
  ContractType,
  EnabledModuleFragment,
  EnabledModulesFragment,
  EncryptionParamsFragment,
  EncryptionProvider,
  Erc20AmountFragment,
  Erc20Fragment,
  FeedItemFragment,
  FollowModules,
  MediaFragment,
  MetadataFragment,
  MirrorFragment,
  ModuleInfoFragment,
  PostFragment,
  ProfileFollowModuleSettings,
  ProfileFollowRevenueFragment,
  ProfileFragment,
  ProfileMediaFragment,
  ProfileOwnershipFragment,
  ProfileStatsFragment,
  PublicationMainFocus,
  PublicationRevenueFragment,
  PublicationStatsFragment,
  ReactionTypes,
  RelayerResultFragment,
  RelayErrorFragment,
  RelayErrorReasons,
  RevenueAggregateFragment,
  RevenueFragment,
  ScalarOperator,
  WalletFragment,
  WhoReactedResultFragment,
  AnyConditionFragment,
  RootConditionFragment,
  NftOwnershipOutput,
  Erc20OwnershipOutput,
  EoaOwnershipOutput,
  ProfileOwnershipOutput,
  FollowConditionOutput,
  LeafConditionFragment,
  EncryptedFieldsFragment,
} from '../generated';
import { erc20Amount } from '../utils';

export function mockMediaFragment(overrides?: Partial<MediaFragment>): MediaFragment {
  return {
    altTag: faker.lorem.sentence(),
    cover: faker.image.imageUrl(),
    mimeType: 'image/jpeg',
    url: faker.image.imageUrl(),
    ...overrides,
    __typename: 'Media',
  };
}

export function mockProfileMediaFragment(
  overrides?: Partial<ProfileMediaFragment>,
): ProfileMediaFragment {
  return {
    original: mockMediaFragment(),
    ...overrides,
    __typename: 'MediaSet',
  };
}

export function mockAttributeFragment(overrides?: Partial<AttributeFragment>): AttributeFragment {
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

export function mockWalletFragment(): WalletFragment {
  return {
    __typename: 'Wallet',
    defaultProfile: mockProfileFragment(),
    address: mockEthereumAddress(),
  };
}

export function mockProfileStatsFragment(
  overrides?: Partial<ProfileStatsFragment>,
): ProfileStatsFragment {
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

export function mockProfileFragment(overrides?: Partial<ProfileFragment>): ProfileFragment {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: mockProfileId(),
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentence(),
    handle: faker.internet.userName(firstName, lastName),
    ownedBy: mockEthereumAddress(),
    picture: mockProfileMediaFragment(),
    coverPicture: mockProfileMediaFragment(),

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

    __followModule: null,
    followPolicy: mockAnyoneFollowPolicy(),

    __isFollowedByMe: false,
    isFollowingObserver: false,
    followStatus: null,

    ownedByMe: false,

    __attributes: [],
    attributes: {} as ProfileAttributes,

    ...overrides,
    __typename: 'Profile',
  };
}

export function mockProfileFollowFollowModuleFragment(): ProfileFollowModuleSettings {
  return {
    __typename: 'ProfileFollowModuleSettings',
    contractAddress: mockEthereumAddress(),
    type: FollowModules.ProfileFollowModule,
  };
}

export function mockRelayerResultFragment(
  txHash: string = mockTransactionHash(),
): RelayerResultFragment {
  return {
    __typename: 'RelayerResult',
    txHash,
    txId: faker.datatype.uuid(),
  };
}

export function mockRelayErrorFragment(reason: RelayErrorReasons): RelayErrorFragment {
  return {
    __typename: 'RelayError',
    reason,
  };
}

export function mockPublicationStatsFragment(
  overrides?: Partial<PublicationStatsFragment>,
): PublicationStatsFragment {
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

export function mockEncryptedFieldsFragment(
  overrides?: Partial<EncryptedFieldsFragment>,
): EncryptedFieldsFragment {
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

function mockFreeCollectModuleSettings({ followerOnly = false } = {}): CollectModuleFragment {
  return {
    __typename: 'FreeCollectModuleSettings',
    contractAddress: '0x96351D3cE872903EBf4c2D77dd625992CCFdf8c9',
    followerOnly,
  };
}

export function mockMetadataFragment(overrides?: Partial<MetadataFragment>): MetadataFragment {
  return {
    mainContentFocus: PublicationMainFocus.TextOnly,
    animatedUrl: faker.internet.url(),
    name: faker.commerce.productName(),
    description: null,
    attributes: [],
    content: faker.lorem.words(5),
    image: faker.internet.url(),
    media: [],
    __encryptionParams: null,
    ...overrides,
    __typename: 'MetadataOutput',
  };
}

function mockNoFeeCollectPolicy(overrides?: Partial<NoFeeCollectPolicy>): NoFeeCollectPolicy {
  return {
    type: CollectPolicyType.FREE,
    state: CollectState.CAN_BE_COLLECTED,
    followerOnly: false,
    ...overrides,
  };
}

export function mockPostFragment(
  overrides?: Partial<Omit<PostFragment, '__typename'>>,
): PostFragment {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.datatype.datetime().toISOString(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataFragment(),
    profile: mockProfileFragment(),
    collectedBy: null,
    __collectModule: mockFreeCollectModuleSettings(),
    collectPolicy: mockNoFeeCollectPolicy(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
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
  };
}

export function mockCommentFragment(
  overrides?: Partial<Omit<CommentFragment, '__typename'>>,
): CommentFragment {
  const mainPost = mockPostFragment();

  return {
    id: faker.datatype.uuid(),
    stats: mockPublicationStatsFragment(),
    metadata: mockMetadataFragment(),
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    collectedBy: null,
    commentOn: mainPost,
    mainPost: mainPost,
    __collectModule: mockFreeCollectModuleSettings(),
    collectPolicy: mockNoFeeCollectPolicy(),
    referenceModule: null,
    hasCollectedByMe: false,
    hasOptimisticCollectedByMe: false,
    isOptimisticMirroredByMe: false,
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
    ...overrides,
    __typename: 'Comment',
  };
}

export function mockMirrorFragment(
  overrides?: Partial<Omit<MirrorFragment, '__typename'>>,
): MirrorFragment {
  const mainPost = mockPostFragment();

  return {
    id: faker.datatype.uuid(),
    profile: mockProfileFragment(),
    createdAt: faker.date.past().toISOString(),
    mirrorOf: mainPost,
    hidden: false,
    ...overrides,
    __typename: 'Mirror',
  };
}

export function mockFeedItemFragment(overrides?: Partial<FeedItemFragment>): FeedItemFragment {
  return {
    root: mockPostFragment(),
    comments: null,
    ...overrides,
    __typename: 'FeedItem',
  };
}

function mockErc20Fragment(overrides?: Partial<Omit<Erc20Fragment, '__typename'>>): Erc20Fragment {
  return {
    __typename: 'Erc20',
    name: 'Wrapped MATIC',
    symbol: 'WMATIC',
    decimals: 18,
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockErc20AmountFragment(amount = mockDaiAmount(42)): Erc20AmountFragment {
  return {
    __typename: 'Erc20Amount',
    asset: mockErc20Fragment({
      name: amount.asset.name,
      symbol: amount.asset.symbol,
      decimals: amount.asset.decimals,
      address: amount.asset.address,
    }),
    value: amount.toSignificantDigits(),
  };
}

function mockRevenueAggregateFragment(amount?: Amount<Erc20>): RevenueAggregateFragment {
  const total = mockErc20AmountFragment(amount);
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
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): PublicationRevenueFragment {
  return {
    __typename: 'PublicationRevenue',
    publication: publication,
    revenue: mockRevenueAggregateFragment(amount),
  };
}

export function mockRevenueFragment({
  amount,
}: {
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): RevenueFragment {
  return {
    __typename: 'PublicationRevenue',
    revenue: mockRevenueAggregateFragment(amount),
  };
}

export function mockProfileFollowRevenueFragment({
  amount,
}: {
  publication?: CommentFragment | PostFragment | MirrorFragment;
  amount?: Amount<Erc20>;
} = {}): ProfileFollowRevenueFragment {
  return {
    __typename: 'FollowRevenueResult',
    revenues: [mockRevenueAggregateFragment(amount)],
  };
}

export function mockWhoReactedResultFragment(
  overrides?: Partial<Omit<WhoReactedResultFragment, '__typename'>>,
): WhoReactedResultFragment {
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
  overrides?: Partial<Omit<ModuleInfoFragment, '__typename'>>,
): ModuleInfoFragment {
  return {
    __typename: 'ModuleInfo',
    name: faker.datatype.string(),
    type: faker.datatype.string(),
    ...overrides,
  };
}

export function mockEnabledModuleFragment(
  overrides?: Partial<Omit<EnabledModuleFragment, '__typename'>>,
): EnabledModuleFragment {
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
  overrides?: Partial<Omit<EnabledModulesFragment, '__typename'>>,
): EnabledModulesFragment {
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
): AnyConditionFragment {
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
): AnyConditionFragment {
  return {
    __typename: 'AccessConditionOutput',
    token: {
      amount: '100',
      chainID: 1,
      contractAddress: mockEthereumAddress(),
      decimals: 18,
      condition: ScalarOperator.Equal,
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
): AnyConditionFragment {
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
): AnyConditionFragment {
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
): AnyConditionFragment {
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
): AnyConditionFragment {
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
  criteria: Array<AnyConditionFragment | LeafConditionFragment> = [],
): AnyConditionFragment {
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
  criteria: Array<AnyConditionFragment | LeafConditionFragment> = [],
): AnyConditionFragment {
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
  overrides?: Partial<ProfileOwnershipFragment>,
): AnyConditionFragment {
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
  others: AnyConditionFragment[];
  ownerId: ProfileId;
}): RootConditionFragment {
  return {
    __typename: 'AccessConditionOutput',
    or: {
      criteria: [mockPublicationOwnerAccessCondition({ profileId: ownerId }), ...others],
    },
  };
}

export function mockEncryptionParamsFragment({
  others,
  ownerId,
  encryptedFields = mockEncryptedFieldsFragment(),
  encryptionKey = '0x123',
}: {
  others: AnyConditionFragment[];
  ownerId: ProfileId;
  encryptedFields?: EncryptedFieldsFragment;
  encryptionKey?: ContentEncryptionKey;
}): EncryptionParamsFragment {
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
