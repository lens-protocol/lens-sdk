import { faker } from '@faker-js/faker';
import { ChainType, Result } from '@lens-protocol/shared-kernel';
import {
  mockEthereumAddress,
  mockDaiAmount,
  mockUsdcAmount,
} from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Transaction, TransactionKind, NftOwnershipChallenge } from '../../../entities';
import { mockSignature } from '../../../entities/__helpers__/mocks';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  IProfileTransactionGateway,
} from '../CreateProfile';
import {
  UnconstrainedFollowRequest,
  PaidFollowRequest,
  ProfileOwnerFollowRequest,
} from '../FollowProfiles';
import {
  INftOwnershipChallengeGateway,
  NftOwnershipSignature,
  ProveNftOwnershipRequest,
} from '../ProveNftOwnership';
import { UnfollowRequest } from '../UnfollowProfile';
import { UpdateDispatcherConfigRequest } from '../UpdateDispatcherConfig';
import {
  ChargeFollowPolicy,
  FollowPolicyType,
  NoFeeFollowPolicy,
  UpdateFollowPolicyRequest,
} from '../UpdateFollowPolicy';
import { UpdateProfileDetailsRequest } from '../UpdateProfileDetails';
import {
  UpdateNftProfileImageRequest,
  UpdateOffChainProfileImageRequest,
} from '../UpdateProfileImage';

export function mockCreateProfileRequest(
  overrides?: Partial<CreateProfileRequest>,
): CreateProfileRequest {
  return {
    handle: faker.internet.userName(),
    ...overrides,
    kind: TransactionKind.CREATE_PROFILE,
  };
}

export function mockIProfileTransactionGateway({
  request,
  result,
}: {
  request: CreateProfileRequest;
  result: Result<Transaction<CreateProfileRequest>, DuplicatedHandleError>;
}) {
  const profileTransactionGateway = mock<IProfileTransactionGateway>();

  when(profileTransactionGateway.createProfileTransaction)
    .calledWith(request)
    .mockResolvedValue(result);

  return profileTransactionGateway;
}

export function mockProfileId() {
  return faker.datatype.uuid();
}

export function mockChargeFollowPolicy(
  overrides?: Partial<ChargeFollowPolicy>,
): ChargeFollowPolicy {
  return {
    amount: mockUsdcAmount(42),
    recipient: mockEthereumAddress(),
    ...overrides,
    type: FollowPolicyType.CHARGE,
  };
}

export function mockFreeFollowPolicy(): NoFeeFollowPolicy {
  return {
    type: FollowPolicyType.ANYONE,
  };
}

export function mockUpdateFollowPolicyRequest(
  overrides?: Partial<UpdateFollowPolicyRequest>,
): UpdateFollowPolicyRequest {
  return {
    profileId: mockProfileId(),
    policy: mockChargeFollowPolicy(),
    ...overrides,
    kind: TransactionKind.UPDATE_FOLLOW_POLICY,
  };
}

export function mockUpdateProfileDetailsRequest(
  overrides?: Partial<UpdateProfileDetailsRequest>,
): UpdateProfileDetailsRequest {
  return {
    attributes: {},
    bio: faker.lorem.sentence(),
    coverPicture: faker.image.imageUrl(),
    name: faker.name.firstName(),
    profileId: mockProfileId(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_DETAILS,
  };
}

export function mockUpdateDispatcherConfigRequest(
  overrides?: Partial<UpdateDispatcherConfigRequest>,
): UpdateDispatcherConfigRequest {
  return {
    profileId: mockProfileId(),
    enabled: true,
    ...overrides,
    kind: TransactionKind.UPDATE_DISPATCHER_CONFIG,
  };
}

export function mockUnconstrainedFollowRequest(
  overrides?: Partial<UnconstrainedFollowRequest>,
): UnconstrainedFollowRequest {
  return {
    followerAddress: mockEthereumAddress(),
    profileId: mockProfileId(),
    ...overrides,
    kind: TransactionKind.FOLLOW_PROFILES,
  };
}

export function mockPaidFollowRequest(): PaidFollowRequest {
  return {
    followerAddress: mockEthereumAddress(),
    profileId: mockProfileId(),
    fee: {
      amount: mockDaiAmount(1, ChainType.POLYGON),
      contractAddress: mockEthereumAddress(),
      recipient: mockEthereumAddress(),
    },
    kind: TransactionKind.FOLLOW_PROFILES,
  };
}

export function mockProfileOwnerFollowRequest(): ProfileOwnerFollowRequest {
  return {
    followerAddress: mockEthereumAddress(),
    profileId: mockProfileId(),
    followerProfileId: mockProfileId(),
    kind: TransactionKind.FOLLOW_PROFILES,
  };
}

export function mockUnfollowRequest(overrides?: Partial<UnfollowRequest>): UnfollowRequest {
  return {
    profileId: mockProfileId(),
    ...overrides,
    kind: TransactionKind.UNFOLLOW_PROFILE,
  };
}

export function mockProveNftOwnershipRequest(): ProveNftOwnershipRequest {
  return {
    contractAddress: mockEthereumAddress(),
    chainId: faker.datatype.number(),
    ownerAddress: mockEthereumAddress(),
    tokenId: faker.datatype.uuid(),
  };
}

export function mockNftOwnershipSignature(
  overrides?: Partial<NftOwnershipSignature>,
): NftOwnershipSignature {
  return {
    id: faker.datatype.uuid(),
    signature: mockSignature(),
    ...overrides,
  };
}

export function mockINftOwnershipChallengeGateway({
  request,
  result,
}: {
  request: ProveNftOwnershipRequest;
  result: NftOwnershipChallenge;
}): INftOwnershipChallengeGateway {
  const gateway = mock<INftOwnershipChallengeGateway>();

  when(gateway.createOwnershipChallenge).calledWith(request).mockResolvedValue(result);

  return gateway;
}

export function mockUpdateNftProfileImageRequest(
  overrides?: Partial<UpdateNftProfileImageRequest>,
): UpdateNftProfileImageRequest {
  return {
    profileId: mockProfileId(),
    delegate: true,
    signature: mockNftOwnershipSignature(),
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_IMAGE,
  };
}

export function mockUpdateOffChainProfileImageRequest(
  overrides?: Partial<UpdateOffChainProfileImageRequest>,
): UpdateOffChainProfileImageRequest {
  return {
    profileId: mockProfileId(),
    url: faker.image.imageUrl(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_IMAGE,
  };
}
