import { faker } from '@faker-js/faker';
import { ChainType, Result } from '@lens-protocol/shared-kernel';
import { mockEvmAddress, mockDaiAmount, mockUsdcAmount } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { TransactionKind, NftOwnershipChallenge, NativeTransaction } from '../../../entities';
import { mockProfileId, mockSignature } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../../transactions';
import { BlockProfilesRequest } from '../BlockProfiles';
import { ClaimHandleRequest } from '../ClaimHandle';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
  IProfileTransactionGateway,
} from '../CreateProfile';
import { ChargeFollowConfig, FollowPolicyType, NoFeeFollowConfig } from '../FollowPolicy';
import { FreeFollowRequest, PaidFollowRequest } from '../FollowProfile';
import { LinkHandleRequest } from '../LinkHandle';
import {
  INftOwnershipChallengeGateway,
  NftOwnershipSignature,
  ProveNftOwnershipRequest,
} from '../ProveNftOwnership';
import { SetProfileMetadataRequest } from '../SetProfileMetadata';
import { UnfollowRequest } from '../UnfollowProfile';
import { UnlinkHandleRequest } from '../UnlinkHandle';
import { UpdateFollowPolicyRequest } from '../UpdateFollowPolicy';
import { UpdateProfileManagersRequest } from '../UpdateProfileManagers';

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
  result: Result<
    NativeTransaction<CreateProfileRequest>,
    DuplicatedHandleError | BroadcastingError
  >;
}) {
  const profileTransactionGateway = mock<IProfileTransactionGateway>();

  when(profileTransactionGateway.createProfileTransaction)
    .calledWith(request)
    .mockResolvedValue(result);

  return profileTransactionGateway;
}

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

export function mockNoFeeFollowConfig(overrides?: Partial<NoFeeFollowConfig>): NoFeeFollowConfig {
  return {
    type: FollowPolicyType.ANYONE,
    ...overrides,
  };
}

export function mockUpdateFollowPolicyRequest(
  overrides?: Partial<UpdateFollowPolicyRequest>,
): UpdateFollowPolicyRequest {
  return {
    policy: mockChargeFollowConfig(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.UPDATE_FOLLOW_POLICY,
  };
}

export function mockSetProfileMetadataRequest(
  overrides?: Partial<SetProfileMetadataRequest>,
): SetProfileMetadataRequest {
  return {
    delegate: true,
    metadataURI: faker.internet.url(),
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_DETAILS,
  };
}

export function mockUpdateProfileManagersRequest(
  overrides?: Partial<UpdateProfileManagersRequest>,
): UpdateProfileManagersRequest {
  return {
    approveSignless: true,
    ...overrides,
    kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
  };
}

export function mockFreeFollowRequest(overrides?: Partial<FreeFollowRequest>): FreeFollowRequest {
  return {
    profileId: mockProfileId(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.FOLLOW_PROFILE,
  };
}

export function mockPaidFollowRequest(): PaidFollowRequest {
  return {
    profileId: mockProfileId(),
    fee: {
      amount: mockDaiAmount(1, ChainType.POLYGON),
      contractAddress: mockEvmAddress(),
      recipient: mockEvmAddress(),
    },
    kind: TransactionKind.FOLLOW_PROFILE,
  };
}

export function mockUnfollowRequest(): UnfollowRequest {
  return {
    profileId: mockProfileId(),
    kind: TransactionKind.UNFOLLOW_PROFILE,
    delegate: true,
  };
}

export function mockProveNftOwnershipRequest(): ProveNftOwnershipRequest {
  return {
    contractAddress: mockEvmAddress(),
    chainId: faker.datatype.number(),
    ownerAddress: mockEvmAddress(),
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

export function mockLinkHandleRequest(overrides?: Partial<LinkHandleRequest>): LinkHandleRequest {
  return {
    handle: faker.internet.userName(),
    delegate: true,
    ...overrides,
    kind: TransactionKind.LINK_HANDLE,
  };
}

export function mockUnlinkHandleRequest(
  overrides?: Partial<UnlinkHandleRequest>,
): UnlinkHandleRequest {
  return {
    handle: faker.internet.userName(),
    delegate: true,
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
    delegate: true,
    profileIds: [mockProfileId()],
    ...overrides,
    kind: TransactionKind.BLOCK_PROFILE,
  };
}
