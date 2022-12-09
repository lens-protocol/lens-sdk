import { ChainType, Result } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { faker } from '@faker-js/faker';
import { mockEthereumAddress, mockDaiAmount, mockUsdcAmount } from '@lens-protocol/shared-kernel';

import { mockSignature } from '../../../entities/__helpers__/mocks';
import { Transaction, TransactionKind, Profile, NftOwnershipChallenge } from '../../../entities';
import { UnfollowRequest } from '../UnfollowProfile';
import { UpdateDispatcherConfigRequest } from '../UpdateDispatcherConfig';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  IProfileTransactionGateway,
} from '../CreateProfile';
import { ActiveProfile } from '../ActiveProfile';
import {
  UnconstrainedFollowRequest,
  PaidFollowRequest,
  ProfileOwnerFollowRequest,
} from '../FollowProfiles';
import {
  ChargeFollowPolicy,
  FollowPolicyType,
  NoFeeFollowPolicy,
  UpdateFollowPolicyRequest,
} from '../UpdateFollowPolicy';
import { UpdateCoverImageRequest } from '../UpdateCoverImage';
import { UpdateProfileDetailsRequest, ProfileDetails } from '../UpdateProfileDetails';
import {
  UpdateNftProfileImageRequest,
  UpdateOffChainProfileImageRequest,
} from '../UpdateProfileImage';
import {
  INftOwnershipChallengeGateway,
  NftOwnershipSignature,
  ProveNftOwnershipRequest,
} from '../ProveNftOwnership';

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

export function mockUpdateCoverImageRequest(
  overrides?: Partial<UpdateCoverImageRequest>,
): UpdateCoverImageRequest {
  return {
    profileId: mockProfileId(),
    url: faker.image.imageUrl(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.UPDATE_COVER_IMAGE,
  };
}

export function mockProfileDetails(overrides?: Partial<ProfileDetails>): ProfileDetails {
  return {
    name: faker.name.firstName(),
    bio: faker.lorem.sentence(),
    location: faker.address.city(),
    website: faker.internet.url(),
    twitter: faker.internet.userName(),
    ...overrides,
  };
}

export function mockUpdateProfileDetailsRequest(
  overrides?: Partial<UpdateProfileDetailsRequest>,
): UpdateProfileDetailsRequest {
  return {
    profileId: mockProfileId(),
    details: mockProfileDetails(),
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

export function mockActiveProfile({ profile }: { profile: Profile }) {
  const activeProfile = mock<ActiveProfile>();

  when(activeProfile.requireActiveProfile).mockResolvedValue(profile);

  return activeProfile;
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

export function mockUpdateNftProfileImageRequest(): UpdateNftProfileImageRequest {
  return {
    profileId: mockProfileId(),
    kind: TransactionKind.UPDATE_PROFILE_IMAGE,
    signature: mockNftOwnershipSignature(),
  };
}

export function mockUpdateOffChainProfileImageRequest(
  overrides?: Partial<UpdateOffChainProfileImageRequest>,
): UpdateOffChainProfileImageRequest {
  return {
    profileId: mockProfileId(),
    url: faker.image.imageUrl(),
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_IMAGE,
  };
}
