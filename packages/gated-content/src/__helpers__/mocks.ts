import { faker } from '@faker-js/faker';
import {
  AdvancedContractCondition,
  Amount,
  Asset,
  CollectCondition,
  ConditionComparisonOperator,
  ConditionType,
  EoaOwnershipCondition,
  Erc20OwnershipCondition,
  EvmAddress,
  FollowCondition,
  NetworkAddress,
  NftContractType,
  NftOwnershipCondition,
  ProfileId,
  ProfileOwnershipCondition,
  PublicationId,
  PublicationMainFocus,
  PublicationMetadata,
  PublicationSchemaId,
  toChainId,
  toEvmAddress,
  toLocale,
  toMarkdown,
  toProfileId,
  toPublicationId,
} from '@lens-protocol/metadata';
import * as mocks from '@lens-protocol/shared-kernel/mocks';

import { AccessControlContract, SupportedChainId } from '../conditions/types';

export function mockPublicationMetadata(): PublicationMetadata {
  return {
    $schema: PublicationSchemaId.ARTICLE_LATEST,
    lens: {
      id: faker.datatype.uuid(),
      content: toMarkdown(faker.lorem.sentence()),
      mainContentFocus: PublicationMainFocus.ARTICLE,
      locale: toLocale('en-US'),
    },
  };
}

export function mockEvmAddress(): EvmAddress {
  return toEvmAddress(mocks.mockEvmAddress());
}

export function mockNetworkAddress(overrides?: Partial<NetworkAddress>): NetworkAddress {
  return {
    address: mockEvmAddress(),
    chainId: toChainId(1),
    ...overrides,
  };
}

export function mockNftOwnershipCondition(
  overrides?: Partial<NftOwnershipCondition>,
): NftOwnershipCondition {
  return {
    type: ConditionType.NFT_OWNERSHIP,
    contract: mockNetworkAddress(),
    contractType: NftContractType.ERC721,
    ...overrides,
  };
}

export function mockAsset(overrides?: Partial<Asset>): Asset {
  return {
    contract: mockNetworkAddress(),
    decimals: 18,
    ...overrides,
  };
}

export function mockAmount(overrides?: Partial<Amount>): Amount {
  return {
    asset: mockAsset(),
    value: '100',
    ...overrides,
  };
}

export function mockProfileId(): ProfileId {
  return toProfileId(faker.datatype.hexadecimal({ length: 2 }));
}

export function mockPublicationId(toProfileId = mockProfileId()): PublicationId {
  return toPublicationId(`${toProfileId}-${faker.datatype.hexadecimal({ length: 2 })}`);
}

export function mockErc20OwnershipCondition(
  overrides?: Partial<Erc20OwnershipCondition>,
): Erc20OwnershipCondition {
  return {
    type: ConditionType.ERC20_OWNERSHIP,
    amount: mockAmount(),
    condition: ConditionComparisonOperator.EQUAL,
    ...overrides,
  };
}

export function mockEoaOwnershipCondition(
  overrides?: Partial<EoaOwnershipCondition>,
): EoaOwnershipCondition {
  return {
    type: ConditionType.EOA_OWNERSHIP,
    address: mockEvmAddress(),
    ...overrides,
  };
}

export function mockProfileOwnershipCondition(
  overrides?: Partial<ProfileOwnershipCondition>,
): ProfileOwnershipCondition {
  return {
    type: ConditionType.PROFILE_OWNERSHIP,
    profileId: mockProfileId(),
    ...overrides,
  };
}

export function mockFollowCondition(overrides?: Partial<FollowCondition>): FollowCondition {
  return {
    type: ConditionType.FOLLOW,
    follow: mockProfileId(),
    ...overrides,
  };
}

export function mockCollectCondition(overrides?: Partial<CollectCondition>): CollectCondition {
  return {
    type: ConditionType.COLLECT,
    publicationId: mockPublicationId(),
    thisPublication: false,
    ...overrides,
  };
}

export function mockAdvancedContractCondition(
  overrides?: Partial<AdvancedContractCondition>,
): AdvancedContractCondition {
  return {
    type: ConditionType.ADVANCED_CONTRACT,
    contract: mockNetworkAddress(),
    abi: 'function balanceOf(address) external view returns (uint256)',
    functionName: 'balanceOf',
    params: [':userAddress'],
    comparison: ConditionComparisonOperator.EQUAL,
    value: '1',
    ...overrides,
  };
}

export function mockAccessControlContract(
  overrides?: Partial<AccessControlContract>,
): AccessControlContract {
  return {
    address: mockEvmAddress(),
    chainId: SupportedChainId.AMOY,
    ...overrides,
  };
}
