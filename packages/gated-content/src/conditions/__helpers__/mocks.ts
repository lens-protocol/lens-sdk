import {
  CollectConditionInput,
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

export function mockNftOwnershipInput(overrides?: Partial<NftOwnershipInput>): NftOwnershipInput {
  return {
    chainID: 1,
    contractAddress: mockEthereumAddress(),
    contractType: ContractType.Erc721,
    ...overrides,
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

export function mockEoaOwnershipInput(overrides?: Partial<EoaOwnershipInput>): EoaOwnershipInput {
  return {
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockProfileOwnershipInput(
  overrides?: Partial<ProfileOwnershipInput>,
): ProfileOwnershipInput {
  return { profileId: mockProfileId(), ...overrides };
}

export function mockFollowConditionInput(
  overrides?: Partial<FollowConditionInput>,
): FollowConditionInput {
  return { profileId: mockProfileId(), ...overrides };
}

export function mockCollectConditionInput(
  condition: CollectConditionInput = {
    publicationId: mockPublicationId(),
    thisPublication: null,
  },
): CollectConditionInput {
  return condition;
}
