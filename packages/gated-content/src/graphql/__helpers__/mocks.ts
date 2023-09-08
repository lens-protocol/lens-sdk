import { faker } from '@faker-js/faker';
import { toMarkdown } from '@lens-protocol/metadata';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { mockProfileId, mockPublicationId } from '../../__helpers__/mocks';
import {
  Amount,
  AndCondition,
  EncryptedFragmentOfAnyPublicationMetadata,
  ArticleMetadataV3,
  Erc20,
  AudioSet,
  CollectCondition,
  ComparisonOperatorConditionType,
  EncryptedFragmentOf,
  EncryptedMedia,
  EncryptedFragmentOfLegacyPublicationMetadata,
  EoaOwnershipCondition,
  Erc20OwnershipCondition,
  FollowCondition,
  ImageSet,
  LegacyAudioItem,
  LegacyImageItem,
  LegacyVideoItem,
  NftOwnershipCondition,
  OrCondition,
  ProfileOwnershipCondition,
  PublicationMetadataV2EncryptedFields,
  PublicationMetadataV2Encryption,
  PublicationMetadataV3LitEncryption,
  VideoSet,
  NetworkAddress,
  NftContractType,
  Audio,
  Image,
  Video,
  RootCondition,
} from '../index';

export function mockRootCondition(overrides?: Partial<RootCondition>): RootCondition {
  return {
    criteria: [],
    ...overrides,
    __typename: 'RootCondition',
  };
}

export function mockOrCondition(overrides?: Partial<OrCondition>): OrCondition {
  return {
    criteria: [],
    ...overrides,
    __typename: 'OrCondition',
  };
}

export function mockAndCondition(overrides?: Partial<AndCondition>): AndCondition {
  return {
    criteria: [],
    ...overrides,
    __typename: 'AndCondition',
  };
}

export function mockCollectCondition(overrides?: Partial<CollectCondition>): CollectCondition {
  return {
    publicationId: mockPublicationId(),
    thisPublication: false,
    ...overrides,
    __typename: 'CollectCondition',
  };
}

export function mockFollowCondition(overrides?: Partial<FollowCondition>): FollowCondition {
  return {
    follow: mockProfileId(),
    ...overrides,
    __typename: 'FollowCondition',
  };
}

export function mockNetworkAddress(overrides?: Partial<NetworkAddress>): NetworkAddress {
  return {
    address: mockEthereumAddress(),
    chainId: faker.datatype.number({ min: 1, max: 1000 }).toString(),
    ...overrides,
    __typename: 'NetworkAddress',
  };
}

export function mockErc20(overrides?: Partial<Erc20>): Erc20 {
  return {
    contract: mockNetworkAddress(),
    name: faker.lorem.word(),
    symbol: faker.lorem.word(),
    decimals: 18,
    ...overrides,
    __typename: 'Erc20',
  };
}

export function mockAmount(overrides?: Partial<Amount>): Amount {
  return {
    asset: mockErc20(),
    value: faker.datatype.number({ min: 1, max: 1000 }).toFixed(18),
    ...overrides,
    __typename: 'Amount',
  };
}

export function mockErc20OwnershipCondition(
  overrides?: Partial<Erc20OwnershipCondition>,
): Erc20OwnershipCondition {
  return {
    amount: mockAmount(),
    condition: ComparisonOperatorConditionType.Equal,
    ...overrides,
    __typename: 'Erc20OwnershipCondition',
  };
}

export function mockNftOwnershipCondition(
  overrides?: Partial<NftOwnershipCondition>,
): NftOwnershipCondition {
  return {
    contract: mockNetworkAddress(),
    contractType: NftContractType.Erc721,
    ...overrides,
    __typename: 'NftOwnershipCondition',
  };
}

export function mockProfileOwnershipCondition(
  overrides?: Partial<ProfileOwnershipCondition>,
): ProfileOwnershipCondition {
  return {
    profileId: mockProfileId(),
    ...overrides,
    __typename: 'ProfileOwnershipCondition',
  };
}

export function mockEoaOwnershipCondition(
  overrides?: Partial<EoaOwnershipCondition>,
): EoaOwnershipCondition {
  return {
    address: mockEthereumAddress(),
    ...overrides,
    __typename: 'EoaOwnershipCondition',
  };
}

export function mockPublicationMetadataV3LitEncryption(
  overrides?: Partial<PublicationMetadataV3LitEncryption>,
): PublicationMetadataV3LitEncryption {
  return {
    accessCondition: mockRootCondition(),
    encryptionKey: faker.datatype.hexadecimal({ length: 368 }),
    encryptedPaths: [],
    ...overrides,
    __typename: 'PublicationMetadataV3LitEncryption',
  };
}

export function mockEncryptedArticleMetadataV3Fragment({
  encryptedWith = mockPublicationMetadataV3LitEncryption(),
  ...overrides
}: Partial<
  EncryptedFragmentOf<ArticleMetadataV3>
> = {}): EncryptedFragmentOfAnyPublicationMetadata {
  return {
    content: toMarkdown(faker.lorem.sentence()),
    encryptedWith,
    ...overrides,
    __typename: 'ArticleMetadataV3',
  };
}

export function mockAudioFragment(overrides?: Partial<Audio>): Audio {
  return {
    uri: faker.internet.url(),
    ...overrides,
    __typename: 'Audio',
  };
}

export function mockImageFragment(overrides?: Partial<Image>): Image {
  return {
    uri: faker.internet.url(),
    ...overrides,
    __typename: 'Image',
  };
}

export function mockVideoFragment(overrides?: Partial<Video>): Video {
  return {
    uri: faker.internet.url(),
    ...overrides,
    __typename: 'Video',
  };
}

export function mockAudioSetFragment(overrides?: Partial<AudioSet>): AudioSet {
  return {
    raw: mockAudioFragment(),
    ...overrides,
    __typename: 'AudioSet',
  };
}

export function mockImageSetFragment(overrides?: Partial<ImageSet>): ImageSet {
  return {
    raw: mockImageFragment(),
    ...overrides,
    __typename: 'ImageSet',
  };
}

export function mockVideoSetFragment(overrides?: Partial<VideoSet>): VideoSet {
  return {
    raw: mockVideoFragment(),
    ...overrides,
    __typename: 'VideoSet',
  };
}

export function mockLegacyAudioItemFragment(overrides?: Partial<LegacyAudioItem>): LegacyAudioItem {
  return {
    audio: mockAudioSetFragment(),
    ...overrides,
    __typename: 'LegacyAudioItem',
  };
}

export function mockLegacyImageItemFragment(overrides?: Partial<LegacyImageItem>): LegacyImageItem {
  return {
    image: mockImageSetFragment(),
    ...overrides,
    __typename: 'LegacyImageItem',
  };
}

export function mockLegacyVideoItemFragment(overrides?: Partial<LegacyVideoItem>): LegacyVideoItem {
  return {
    video: mockVideoSetFragment(),
    ...overrides,
    __typename: 'LegacyVideoItem',
  };
}

export function mockEncryptedMedia(overrides?: Partial<EncryptedMedia>): EncryptedMedia {
  return {
    uri: faker.datatype.hexadecimal({ length: 64 }),
    altTag: faker.datatype.hexadecimal({ length: 64 }),
    cover: faker.datatype.hexadecimal({ length: 64 }),
    mimeType: 'image/jpeg',
    ...overrides,
    __typename: 'EncryptedMedia',
  };
}

export function mockPublicationMetadataV2EncryptedFields(
  overrides?: Partial<PublicationMetadataV2EncryptedFields>,
): PublicationMetadataV2EncryptedFields {
  return {
    animationUrl: faker.datatype.hexadecimal({ length: 64 }),
    content: faker.datatype.hexadecimal({ length: 64 }),
    externalUrl: faker.datatype.hexadecimal({ length: 64 }),
    image: faker.datatype.hexadecimal({ length: 64 }),
    media: [mockEncryptedMedia()],
    ...overrides,
    __typename: 'PublicationMetadataV2EncryptedFields',
  };
}

export function mockPublicationMetadataV2Encryption(
  overrides?: Partial<PublicationMetadataV2Encryption>,
): PublicationMetadataV2Encryption {
  return {
    accessCondition: mockRootCondition(),
    encryptionKey: faker.datatype.hexadecimal({ length: 368 }),
    encryptedFields: mockPublicationMetadataV2EncryptedFields(),
    ...overrides,
    __typename: 'PublicationMetadataV2Encryption',
  };
}

export function mockEncryptedFragmentOfLegacyPublicationMetadata({
  encryptedWith = mockPublicationMetadataV2Encryption(),
  ...overrides
}: Partial<EncryptedFragmentOfLegacyPublicationMetadata> = {}): EncryptedFragmentOfLegacyPublicationMetadata {
  return {
    encryptedWith,
    ...overrides,
    __typename: 'LegacyPublicationMetadata',
  };
}
