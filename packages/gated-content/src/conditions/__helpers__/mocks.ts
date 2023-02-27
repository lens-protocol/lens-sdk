import {
  AndConditionInput,
  ContractType,
  EoaOwnershipInput,
  Erc20OwnershipInput,
  FollowConditionInput,
  NftOwnershipInput,
  ProfileOwnershipInput,
  ScalarOperator,
} from '@lens-protocol/api-bindings';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { AccessCondition, CollectCondition } from '../types';

export function mockNftOwnershipInput(overrides?: Partial<NftOwnershipInput>): NftOwnershipInput {
  return {
    chainID: 1,
    contractAddress: mockEthereumAddress(),
    contractType: ContractType.Erc721,
    ...overrides,
  };
}

export function mockNftOwnershipAccessCondition(
  overrides?: Partial<NftOwnershipInput>,
): AccessCondition {
  return {
    nft: {
      chainID: 1,
      contractAddress: mockEthereumAddress(),
      contractType: ContractType.Erc721,
      ...overrides,
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

export function mockErc20OwnershipInput(
  overrides?: Partial<Erc20OwnershipInput>,
): Erc20OwnershipInput {
  return {
    amount: '100',
    chainID: 1,
    contractAddress: mockEthereumAddress(),
    decimals: 18,
    condition: ScalarOperator.Equal,
    ...overrides,
  };
}

export function mockErc20OwnershipAccessCondition(
  overrides?: Partial<Erc20OwnershipInput>,
): AccessCondition {
  return {
    token: {
      amount: '100',
      chainID: 1,
      contractAddress: mockEthereumAddress(),
      decimals: 18,
      condition: ScalarOperator.Equal,
      ...overrides,
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

export function mockEoaOwnershipInput(overrides?: Partial<EoaOwnershipInput>): EoaOwnershipInput {
  return {
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockEoaOwnershipAccessCondition(
  overrides?: Partial<EoaOwnershipInput>,
): AccessCondition {
  return {
    eoa: {
      address: mockEthereumAddress(),
      ...overrides,
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

export function mockProfileOwnershipInput(
  overrides?: Partial<ProfileOwnershipInput>,
): ProfileOwnershipInput {
  return { profileId: mockProfileId(), ...overrides };
}

export function mockProfileOwnershipAccessCondition(
  overrides?: Partial<ProfileOwnershipInput>,
): AccessCondition {
  return {
    profile: { profileId: mockProfileId(), ...overrides },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    token: null,
  };
}

export function mockFollowConditionInput(
  overrides?: Partial<FollowConditionInput>,
): FollowConditionInput {
  return { profileId: mockProfileId(), ...overrides };
}

export function mockFollowConditionAccessCondition(
  overrides?: Partial<FollowConditionInput>,
): AccessCondition {
  return {
    follow: { profileId: mockProfileId(), ...overrides },
    and: null,
    collect: null,
    eoa: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockCollectCondition(
  condition: CollectCondition = {
    publicationId: mockPublicationId(),
    thisPublication: null,
  },
): CollectCondition {
  return condition;
}

export function mockCollectConditionAccessCondition(
  condition: CollectCondition = {
    publicationId: mockPublicationId(),
    thisPublication: null,
  },
): AccessCondition {
  return {
    collect: {
      ...condition,
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

export function mockOrAccessCondition(criteria: AccessCondition[] = []): AccessCondition {
  return {
    or: { criteria },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    profile: null,
    token: null,
  };
}

export function mockAndConditionInput(criteria: AccessCondition[] = []): AndConditionInput {
  return { criteria };
}

export function mockAndAccessCondition(criteria: AccessCondition[] = []): AccessCondition {
  return {
    and: { criteria },
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    profile: null,
    token: null,
  };
}

export function mockPublicationOwnerAccessCondition(
  overrides?: Partial<ProfileOwnershipInput>,
): AccessCondition {
  return {
    profile: { profileId: mockProfileId(), ...overrides },
    and: null,
    collect: null,
    eoa: null,
    follow: null,
    nft: null,
    or: null,
    token: null,
  };
}
