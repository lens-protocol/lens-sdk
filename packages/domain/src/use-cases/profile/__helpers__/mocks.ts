import { faker } from '@faker-js/faker';
import { ChainType, URI } from '@lens-protocol/shared-kernel';
import {
  mockDaiAmount,
  mockData,
  mockEvmAddress,
  mockUsdcAmount,
} from '@lens-protocol/shared-kernel/mocks';

import { TransactionKind } from '../../../entities';
import { mockProfileId } from '../../../entities/__helpers__/mocks';
import { BlockProfilesRequest } from '../BlockProfiles';
import { ClaimHandleRequest } from '../ClaimHandle';
import { CreateProfileRequest } from '../CreateProfile';
import { ChargeFollowConfig, FollowPolicyType } from '../FollowPolicy';
import { FreeFollowRequest, PaidFollowRequest, UnknownFollowRequest } from '../FollowProfile';
import { LinkHandleRequest } from '../LinkHandle';
import { SetProfileMetadataRequest } from '../SetProfileMetadata';
import { UnblockProfilesRequest } from '../UnblockProfiles';
import { UnfollowRequest } from '../UnfollowProfile';
import { UnlinkHandleRequest } from '../UnlinkHandle';
import { UpdateFollowPolicyRequest } from '../UpdateFollowPolicy';
import { UpdateProfileManagersRequest } from '../UpdateProfileManagers';

export function mockChargeFollowConfig(
  overrides?: Partial<ChargeFollowConfig>,
): ChargeFollowConfig {
  return {
    amount: mockUsdcAmount(42),
    recipient: mockEvmAddress(),
    ...overrides,
    type: FollowPolicyType.CHARGE,
  };
}

export function mockCreateProfileRequest(
  overrides?: Partial<CreateProfileRequest>,
): CreateProfileRequest {
  return {
    localName: faker.internet.userName(),
    approveSignless: true,
    to: mockEvmAddress(),
    ...overrides,
    kind: TransactionKind.CREATE_PROFILE,
  };
}

export function mockUpdateFollowPolicyRequest(
  overrides?: Partial<UpdateFollowPolicyRequest>,
): UpdateFollowPolicyRequest {
  return {
    policy: mockChargeFollowConfig(),
    signless: true,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.UPDATE_FOLLOW_POLICY,
  };
}

export function mockSetProfileMetadataRequest(
  overrides?: Partial<SetProfileMetadataRequest>,
): SetProfileMetadataRequest {
  return {
    signless: true,
    sponsored: true,
    metadataURI: faker.internet.url() as URI,
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_DETAILS,
  };
}

export function mockUpdateProfileManagersRequest(
  overrides?: Partial<UpdateProfileManagersRequest>,
): UpdateProfileManagersRequest {
  return {
    approveSignless: true,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
  };
}

export function mockFreeFollowRequest(overrides?: Partial<FreeFollowRequest>): FreeFollowRequest {
  return {
    profileId: mockProfileId(),
    signless: true,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.FOLLOW_PROFILE,
  };
}

export function mockPaidFollowRequest(overrides?: Partial<PaidFollowRequest>): PaidFollowRequest {
  return {
    profileId: mockProfileId(),
    fee: {
      amount: mockDaiAmount(1, ChainType.POLYGON),
      contractAddress: mockEvmAddress(),
      recipient: mockEvmAddress(),
    },
    sponsored: true,
    signless: false,
    ...overrides,
    kind: TransactionKind.FOLLOW_PROFILE,
  };
}

export function mockUnknownFollowRequest(
  overrides?: Partial<UnknownFollowRequest>,
): UnknownFollowRequest {
  return {
    profileId: mockProfileId(),
    address: mockEvmAddress(),
    data: mockData(),
    sponsored: true,
    signless: false,
    ...overrides,
    kind: TransactionKind.FOLLOW_PROFILE,
  };
}

export function mockUnfollowRequest(): UnfollowRequest {
  return {
    profileId: mockProfileId(),
    kind: TransactionKind.UNFOLLOW_PROFILE,
    sponsored: true,
    signless: true,
  };
}

function mockFullHandle(): string {
  const localName = faker.internet.userName();
  const namespace = faker.internet.domainWord();

  return `${localName}/${namespace}`;
}

export function mockLinkHandleRequest(overrides?: Partial<LinkHandleRequest>): LinkHandleRequest {
  return {
    fullHandle: mockFullHandle(),
    profileId: mockProfileId(),
    signless: true,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.LINK_HANDLE,
  };
}

export function mockUnlinkHandleRequest(
  overrides?: Partial<UnlinkHandleRequest>,
): UnlinkHandleRequest {
  return {
    fullHandle: mockFullHandle(),
    profileId: mockProfileId(),
    signless: true,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.UNLINK_HANDLE,
  };
}

export function mockClaimHandleRequest(): ClaimHandleRequest {
  return {
    localName: faker.internet.userName(),
    kind: TransactionKind.CLAIM_HANDLE,
  };
}

export function mockBlockProfilesRequest(
  overrides?: Partial<BlockProfilesRequest>,
): BlockProfilesRequest {
  return {
    signless: true,
    profileIds: [mockProfileId()],
    sponsored: true,
    ...overrides,
    kind: TransactionKind.BLOCK_PROFILE,
  };
}

export function mockUnblockProfilesRequest(
  overrides?: Partial<UnblockProfilesRequest>,
): UnblockProfilesRequest {
  return {
    signless: true,
    profileIds: [mockProfileId()],
    sponsored: true,
    ...overrides,
    kind: TransactionKind.UNBLOCK_PROFILE,
  };
}
