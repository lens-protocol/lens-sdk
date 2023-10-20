import { Amount, Data, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProfileId,
  PublicationId,
} from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { SignedOnChain } from '../transactions/SignedOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../wallets/TokenAvailability';

export enum AllOpenActionType {
  LEGACY_COLLECT = 'LEGACY_COLLECT',
  SIMPLE_COLLECT = 'SIMPLE_COLLECT',
  MULTIRECIPIENT_COLLECT = 'MULTIRECIPIENT_COLLECT',
  UNKNOWN_OPEN_ACTION = 'UNKNOWN_OPEN_ACTION',
}

export type CollectFee = {
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
};

export type LegacyCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.LEGACY_COLLECT;
  delegate: boolean;
  publicationId: PublicationId;
  referrer?: PublicationId;
  fee?: CollectFee;
};

export type Referrers = ReadonlyArray<PublicationId | ProfileId>;

export type SimpleCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.SIMPLE_COLLECT;
  delegate: boolean;
  publicationId: PublicationId;
  referrers?: Referrers;
  fee?: CollectFee;
};

export type MultirecipientCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.MULTIRECIPIENT_COLLECT;
  publicationId: PublicationId;
  referrers?: Referrers;
  fee: CollectFee;
};

export type UnknownActionRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.UNKNOWN_OPEN_ACTION;
  delegate: boolean;
  publicationId: PublicationId;
  address: EvmAddress;
  data: Data;
};

export type CollectRequest =
  | LegacyCollectRequest
  | SimpleCollectRequest
  | MultirecipientCollectRequest;

export type OpenActionRequest = CollectRequest | UnknownActionRequest;

export type DelegableOpenActionRequest =
  | LegacyCollectRequest
  | SimpleCollectRequest
  | UnknownActionRequest;

function isCollectRequest(request: OpenActionRequest): request is CollectRequest {
  return [
    AllOpenActionType.LEGACY_COLLECT,
    AllOpenActionType.SIMPLE_COLLECT,
    AllOpenActionType.MULTIRECIPIENT_COLLECT,
  ].includes(request.type);
}

export type PaidCollectRequest = CollectRequest & { fee: CollectFee };

export function isPaidCollectRequest(request: OpenActionRequest): request is PaidCollectRequest {
  return isCollectRequest(request) && request.fee !== undefined;
}

export type IOpenActionPresenter = ITransactionResultPresenter<
  OpenActionRequest,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class OpenAction {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedExecution: SignedOnChain<OpenActionRequest>,
    private readonly delegableExecution: DelegableSigning<OpenActionRequest>,
    private readonly presenter: IOpenActionPresenter,
  ) {}

  async execute(request: OpenActionRequest) {
    if (isPaidCollectRequest(request)) {
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
