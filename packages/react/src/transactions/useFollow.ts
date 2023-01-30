import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  ChargeFollowPolicy,
  FollowPolicyType,
  FollowRequestFee,
} from '@lens-protocol/domain/use-cases/profile';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  WalletData,
} from '@lens-protocol/domain/use-cases/wallets';
import { EthereumAddress, invariant } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { useActiveProfile } from '../profile';
import { useActiveWalletVar } from '../wallet/adapters/ActiveWalletPresenter';
import { useFollowController } from './adapters/useFollowController';

type FollowProfilesFlowRequest = {
  profileId: string;
  followerAddress: EthereumAddress;
  fee?: FollowRequestFee;
  followerProfileId?: string;
};

function createFollowRequestFee(
  followModule: ChargeFollowPolicy,
  contractAddress: string,
): FollowRequestFee {
  return {
    amount: followModule.amount,
    contractAddress,
    recipient: followModule.recipient,
  };
}

function createFollowProfilesFlowRequest(
  profile: ProfileFragment,
  activeWallet: WalletData,
  activeProfile: ProfileFragment,
): FollowProfilesFlowRequest {
  const baseRequest: Pick<FollowProfilesFlowRequest, 'profileId' | 'followerAddress'> = {
    profileId: profile.id,
    followerAddress: activeWallet.address,
  };

  const followPolicyType = profile.followPolicy.type;

  switch (followPolicyType) {
    case FollowPolicyType.CHARGE:
      return {
        ...baseRequest,
        fee: createFollowRequestFee(profile.followPolicy, profile.followPolicy.contractAddress),
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
    case FollowPolicyType.UNKNOWN:
      throw new Error('Can`t follow with unknown follow module');
  }
}

export type UseFollowArgs = {
  profile: ProfileFragment;
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
  const [isPending, setIsPending] = useState<boolean>(false);
  const follow = useFollowController();
  const activeWallet = useActiveWalletVar();
  const { data: activeProfile } = useActiveProfile();

  return {
    follow: async () => {
      try {
        invariant(activeWallet && activeProfile, 'You must be logged in to follow a profile');
        invariant(
          profile.followPolicy?.type === FollowPolicyType.UNKNOWN,
          'Unsupported follow module',
        );
        setIsPending(true);
        setError(null);

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
      } finally {
        setIsPending(false);
      }
    },
    error,
    isPending,
  };
}
