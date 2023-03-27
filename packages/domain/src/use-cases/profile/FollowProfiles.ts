import { Amount, Erc20, EthereumAddress, failure } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
} from '../../entities';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';
import {
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from '../transactions/ProtocolCallUseCase';
import { SignlessProtocolCallUseCase } from '../transactions/SignlessProtocolCallUseCase';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export type FollowRequestFee = {
  amount: Amount<Erc20>;
  contractAddress: string;
  recipient: EthereumAddress;
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

export type IFollowProfilesCallGateway = IUnsignedProtocolCallGateway<FollowRequest>;

export type IFollowProfilePresenter = IGenericResultPresenter<
  void,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class FollowProfiles {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedFollow: ProtocolCallUseCase<FollowRequest>,
    private readonly signlessFollow: SignlessProtocolCallUseCase<UnconstrainedFollowRequest>,
    private readonly followProfilePresenter: IFollowProfilePresenter,
  ) {}

  async execute(request: FollowRequest) {
    if (isPaidFollowRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.followProfilePresenter.present(failure(result.error));
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
