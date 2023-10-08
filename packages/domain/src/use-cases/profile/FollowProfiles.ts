import { Amount, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
} from '../../entities';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { SignlessSubsidizeOnChain } from '../transactions/SignlessSubsidizeOnChain';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export type FollowRequestFee = {
  amount: Amount<Erc20>;
  contractAddress: string;
  recipient: EvmAddress;
};

export type UnconstrainedFollowRequest = {
  followerAddress: string;
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILES;
};

export type PaidFollowRequest = {
  followerAddress: string;
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILES;
  fee: FollowRequestFee;
};

export type ProfileOwnerFollowRequest = {
  followerAddress: string;
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILES;
  followerProfileId: ProfileId;
};

export type FollowRequest =
  | UnconstrainedFollowRequest
  | ProfileOwnerFollowRequest
  | PaidFollowRequest;

export function isPaidFollowRequest(request: FollowRequest): request is PaidFollowRequest {
  return 'fee' in request && request.fee !== undefined;
}

export function isProfileOwnerFollowRequest(
  request: FollowRequest,
): request is ProfileOwnerFollowRequest {
  return 'followerProfileId' in request && request.followerProfileId !== undefined;
}

export function isUnconstrainedFollowRequest(
  request: FollowRequest,
): request is UnconstrainedFollowRequest {
  return !isPaidFollowRequest(request) && !isProfileOwnerFollowRequest(request);
}

export type IFollowProfilePresenter = ITransactionResultPresenter<
  FollowRequest,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class FollowProfiles {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedFollow: SubsidizeOnChain<FollowRequest>,
    private readonly signlessFollow: SignlessSubsidizeOnChain<UnconstrainedFollowRequest>,
    private readonly followProfilePresenter: IFollowProfilePresenter,
  ) {}

  async execute(request: FollowRequest) {
    if (isPaidFollowRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.followProfilePresenter.present(result);
        return;
      }
    }

    if (isUnconstrainedFollowRequest(request)) {
      await this.signlessFollow.execute(request);
      return;
    }

    await this.signedFollow.execute(request);
  }
}
