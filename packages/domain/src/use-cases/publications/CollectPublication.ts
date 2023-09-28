import { Amount, Erc20, EvmAddress, failure } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
  PublicationId,
} from '../../entities';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { SignlessSubsidizeOnChain } from '../transactions/SignlessSubsidizeOnChain';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export enum CollectType {
  FREE,
  PAID,
}

export type FreeCollectRequest = {
  profileId: ProfileId;
  type: CollectType.FREE;
  publicationId: PublicationId;
  followerOnly: boolean;
  kind: TransactionKind.COLLECT_PUBLICATION;
};

export type CollectFee = {
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
};

export type PaidCollectRequest = {
  profileId: ProfileId;
  type: CollectType.PAID;
  publicationId: PublicationId;
  fee: CollectFee;
  kind: TransactionKind.COLLECT_PUBLICATION;
};

export type CollectRequest = FreeCollectRequest | PaidCollectRequest;

export function isPaidCollectRequest(request: CollectRequest): request is PaidCollectRequest {
  return request.type === CollectType.PAID;
}

export type ICollectPublicationPresenter = ITransactionResultPresenter<
  CollectRequest,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class CollectPublication {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedCollect: SubsidizeOnChain<CollectRequest>,
    private readonly signlessCollect: SignlessSubsidizeOnChain<FreeCollectRequest>,
    private readonly collectPublicationPresenter: ICollectPublicationPresenter,
  ) {}

  async execute(request: CollectRequest) {
    if (isPaidCollectRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.collectPublicationPresenter.present(failure(result.error));
        return;
      }

      await this.signedCollect.execute(request);
      return;
    }
    if (request.followerOnly) {
      await this.signedCollect.execute(request);
      return;
    }

    await this.signlessCollect.execute(request);
  }
}
