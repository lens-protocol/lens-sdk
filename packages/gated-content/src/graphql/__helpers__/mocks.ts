import { faker } from '@faker-js/faker';
import { toMarkdown } from '@lens-protocol/metadata';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { mockProfileId, mockPublicationId } from '../../__helpers__/mocks';
import {
  Amount,
  AndCondition,
  EncryptedFragmentOfAnyPublicationMetadata,
  ArticleMetadataV3,
  Erc20,
  CollectCondition,
  ComparisonOperatorConditionType,
  EncryptedFragmentOf,
  EoaOwnershipCondition,
  Erc20OwnershipCondition,
  FollowCondition,
  NftOwnershipCondition,
  OrCondition,
  ProfileOwnershipCondition,
  PublicationMetadataLitEncryption,
  NetworkAddress,
  NftContractType,
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
    address: mockEvmAddress(),
    chainId: faker.datatype.number({ min: 1, max: 1000 }),
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
    address: mockEvmAddress(),
    ...overrides,
    __typename: 'EoaOwnershipCondition',
  };
}

export function mockPublicationMetadataLitEncryption(
  overrides?: Partial<PublicationMetadataLitEncryption>,
): PublicationMetadataLitEncryption {
  return {
    accessCondition: mockRootCondition(),
    encryptionKey: faker.datatype.hexadecimal({ length: 368 }),
    encryptedPaths: [],
    ...overrides,
    __typename: 'PublicationMetadataLitEncryption',
  };
}

export function mockEncryptedArticleMetadataV3Fragment({
  encryptedWith = mockPublicationMetadataLitEncryption(),
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
