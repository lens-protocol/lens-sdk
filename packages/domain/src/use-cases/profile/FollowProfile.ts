import { Amount, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
} from '../../entities';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
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
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
};

export type PaidFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  fee: FollowRequestFee;
};

export type FollowRequest = UnconstrainedFollowRequest | PaidFollowRequest;

export function isPaidFollowRequest(request: FollowRequest): request is PaidFollowRequest {
  return 'fee' in request && request.fee !== undefined;
}

export function isUnconstrainedFollowRequest(
  request: FollowRequest,
): request is UnconstrainedFollowRequest {
  return !isPaidFollowRequest(request);
}

export type IFollowProfilePresenter = ITransactionResultPresenter<
  FollowRequest,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class FollowProfile {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedFollow: SubsidizeOnChain<FollowRequest>,
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

    await this.signedFollow.execute(request);
  }
}
