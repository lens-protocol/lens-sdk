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

export enum CollectType {
  FREE,
  PAID,
}

export type FreeCollectRequest = {
  profileId: ProfileId;
  type: CollectType.FREE;
  publicationId: string;
  kind: TransactionKind.COLLECT_PUBLICATION;
};

export type CollectFee = {
  amount: Amount<Erc20>;
  contractAddress: EthereumAddress;
};

export type PaidCollectRequest = {
  profileId: ProfileId;
  type: CollectType.PAID;
  publicationId: string;
  fee: CollectFee;
  kind: TransactionKind.COLLECT_PUBLICATION;
};

export type CollectRequest = FreeCollectRequest | PaidCollectRequest;

export function isPaidCollectRequest(request: CollectRequest): request is PaidCollectRequest {
  return request.type === CollectType.PAID;
}

export type ICollectPublicationCallGateway = IUnsignedProtocolCallGateway<CollectRequest>;

export type ICollectPublicationPresenter = IGenericResultPresenter<
  void,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class CollectPublication {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedFlow: ProtocolCallUseCase<CollectRequest>,
    private readonly signlessFlow: SignlessProtocolCallUseCase<FreeCollectRequest>,
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

      await this.signedFlow.execute(request);
      return;
    }

    await this.signlessFlow.execute(request);
  }
}
