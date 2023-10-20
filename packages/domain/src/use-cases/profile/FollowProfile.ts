import { Amount, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
  TransactionError,
} from '../../entities';
import { BroadcastingError } from '../transactions/BroadcastingError';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { SignedOnChain } from '../transactions/SignedOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export type FollowRequestFee = {
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
  recipient: EvmAddress;
};

export type FreeFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  delegate: boolean;
};

export type PaidFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  fee: FollowRequestFee;
};

export type FollowRequest = FreeFollowRequest | PaidFollowRequest;

export function isPaidFollowRequest(request: FollowRequest): request is PaidFollowRequest {
  return 'fee' in request && request.fee !== undefined;
}

export type IFollowProfilePresenter = ITransactionResultPresenter<
  FollowRequest,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | TransactionError
  | UserRejectedError
  | WalletConnectionError
>;

export class FollowProfile {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedFollow: SignedOnChain<FollowRequest>,
    private readonly delegableFollow: DelegableSigning<FreeFollowRequest>,
    private readonly presenter: IFollowProfilePresenter,
  ) {}

  async execute(request: FollowRequest) {
    if (isPaidFollowRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.presenter.present(result);
        return;
      }
      await this.signedFollow.execute(request);
      return;
    }

    await this.delegableFollow.execute(request);
  }
}
