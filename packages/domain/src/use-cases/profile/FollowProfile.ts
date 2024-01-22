import { Amount, Data, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

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
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SignedOnChain } from '../transactions/SignedOnChain';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export type FreeFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  signless: boolean;
  sponsored: boolean;
};

export type FollowRequestFee = {
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
  recipient: EvmAddress;
};

export type PaidFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  fee: FollowRequestFee;
  signless: false;
  sponsored: boolean;
};

export type UnknownFollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.FOLLOW_PROFILE;
  address: EvmAddress;
  data: Data;
  signless: boolean;
  sponsored: boolean;
};

export type FollowRequest = FreeFollowRequest | PaidFollowRequest | UnknownFollowRequest;

export function isPaidFollowRequest(request: FollowRequest): request is PaidFollowRequest {
  return 'fee' in request && request.fee !== undefined;
}

export function isUnknownFollowRequest(request: FollowRequest): request is UnknownFollowRequest {
  return 'address' in request;
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

export class FollowProfile extends SponsorshipReady<FollowRequest> {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedExecution: SignedOnChain<FollowRequest>,
    private readonly delegableExecution: DelegableSigning<FreeFollowRequest>,
    private readonly paidExecution: PaidTransaction<FollowRequest>,
    private readonly presenter: IFollowProfilePresenter,
  ) {
    super();
  }

  protected override async charged(request: FollowRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected override async sponsored(request: FollowRequest): Promise<void> {
    if (isPaidFollowRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.presenter.present(result);
        return;
      }
      await this.signedExecution.execute(request);
      return;
    }

    await this.delegableExecution.execute(request);
  }
}
