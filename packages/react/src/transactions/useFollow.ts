import {
  ProfileFieldsFragmentWithSupportedFollowModule,
  ProfileFieldsFragment,
  isProfileFieldsFragmentWithFeeFollowModule,
  getFollowPolicyTypeFromProfileFieldsFragment,
  FeeFollowModuleSettingsFragment,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  FollowPolicyType,
  FollowRequest,
  FollowRequestFee,
} from '@lens-protocol/domain/use-cases/profile';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  WalletData,
} from '@lens-protocol/domain/use-cases/wallets';
import { assertNever, EthereumAddress, invariant } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { useActiveProfile } from '../profile';
import { useActiveWallet } from '../wallet';
import { TransactionState, useHasPendingTransaction } from './adapters/TransactionQueuePresenter';
import { useFollowController } from './adapters/useFollowController';

type FollowProfilesFlowRequest = {
  profileId: string;
  followerAddress: EthereumAddress;
  fee?: FollowRequestFee;
  followerProfileId?: string;
};

function createFollowRequestFee(followModule: FeeFollowModuleSettingsFragment): FollowRequestFee {
  return {
    amount: followModule.amount.asAmount,
    contractAddress: followModule.contractAddress,
    recipient: followModule.recipient,
  };
}

function createFollowProfilesFlowRequest(
  profile: ProfileFieldsFragmentWithSupportedFollowModule,
  activeWallet: WalletData,
  activeProfile: ProfileFieldsFragment,
): FollowProfilesFlowRequest {
  const followPolicyType = getFollowPolicyTypeFromProfileFieldsFragment(profile);

  const baseRequest: Pick<FollowProfilesFlowRequest, 'profileId' | 'followerAddress'> = {
    profileId: profile.id,
    followerAddress: activeWallet.address,
  };

  switch (followPolicyType) {
    case FollowPolicyType.CHARGE:
      invariant(
        isProfileFieldsFragmentWithFeeFollowModule(profile),
        'Profile is not with a fee follow module',
      );

      return {
        ...baseRequest,
        fee: createFollowRequestFee(profile.followModule),
      };
    case FollowPolicyType.ONLY_PROFILE_OWNERS:
      return {
        ...baseRequest,
        followerProfileId: activeProfile.id,
      };
    case FollowPolicyType.ANYONE:
      return baseRequest;
    case null:
      throw new Error('Can`t follow with unsupported follow fee module');
    case FollowPolicyType.NO_ONE:
      throw new Error('Can`t follow with revert follow fee module');
    default:
      assertNever(followPolicyType, 'Unknown follow policy type');
  }
}

export type UseFollowArgs = {
  profile: ProfileFieldsFragment;
};

export function useFollow({ profile }: UseFollowArgs) {
  const [error, setError] = useState<
    | InsufficientAllowanceError
    | InsufficientFundsError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | null
  >(null);
  const follow = useFollowController();
  const activeWallet = useActiveWallet();
  const { data: activeProfile } = useActiveProfile();

  const hasPendingTx = useHasPendingTransaction(
    (transaction): transaction is TransactionState<FollowRequest> =>
      transaction.request.kind === TransactionKind.FOLLOW_PROFILES &&
      transaction.request.profileId === profile.id,
  );

  return {
    follow: async () => {
      invariant(activeWallet && activeProfile, 'You must be logged in to follow a profile');

      const request = createFollowProfilesFlowRequest(profile, activeWallet, activeProfile);

      const result = await follow({
        profileId: request.profileId,
        followerAddress: request.followerAddress,
        followerProfileId: request.followerProfileId,
        fee: request.fee,
        kind: TransactionKind.FOLLOW_PROFILES,
      });

      if (result.isFailure()) {
        setError(result.error);
      }
    },
    error,
    isPending: hasPendingTx,
  };
}
