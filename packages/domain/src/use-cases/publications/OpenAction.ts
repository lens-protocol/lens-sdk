import { Amount, Data, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import {
  TransactionKind,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  PublicationId,
} from '../../entities';
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
import { Referrers } from './Referrers';

export enum AllOpenActionType {
  LEGACY_COLLECT = 'LEGACY_COLLECT',
  MULTIRECIPIENT_COLLECT = 'MULTIRECIPIENT_COLLECT',
  SHARED_REVENUE_COLLECT = 'SHARED_REVENUE_COLLECT',
  SIMPLE_COLLECT = 'SIMPLE_COLLECT',
  UNKNOWN_OPEN_ACTION = 'UNKNOWN_OPEN_ACTION',
}

export enum FeeType {
  COLLECT = 'COLLECT',
  MINT = 'MINT',
}

export type CollectFee = {
  type: FeeType.COLLECT;
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
};

export type MintFee = {
  type: FeeType.MINT;
  amount: Amount<Erc20>;
  contractAddress: EvmAddress;
  executorClient?: EvmAddress;
};

export type LegacyCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.LEGACY_COLLECT;
  publicationId: PublicationId;
  public: false;
  signless: boolean;
  sponsored: boolean;
  referrer?: PublicationId;
  fee?: CollectFee;
};

export type MultirecipientCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.MULTIRECIPIENT_COLLECT;
  publicationId: PublicationId;
  referrers?: Referrers;
  fee: CollectFee;
  public: boolean;
  signless: boolean;
  sponsored: boolean;
};

export type SimpleCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.SIMPLE_COLLECT;
  publicationId: PublicationId;
  referrers?: Referrers;
  fee?: CollectFee;
  public: boolean;
  signless: boolean;
  sponsored: boolean;
};

export type SharedRevenueCollectRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.SHARED_REVENUE_COLLECT;
  publicationId: PublicationId;
  referrers?: Referrers;
  fee: CollectFee | MintFee;
  public: boolean;
  signless: boolean;
  sponsored: boolean;
};

export type UnknownActionRequest = {
  kind: TransactionKind.ACT_ON_PUBLICATION;
  type: AllOpenActionType.UNKNOWN_OPEN_ACTION;
  publicationId: PublicationId;
  address: EvmAddress;
  data: Data;
  referrers?: Referrers;
  amount?: Amount<Erc20>;
  public: boolean;
  signless: boolean;
  sponsored: boolean;
};

export type CollectRequest =
  | LegacyCollectRequest
  | MultirecipientCollectRequest
  | SharedRevenueCollectRequest
  | SimpleCollectRequest;

export type OpenActionRequest = CollectRequest | UnknownActionRequest;

export type DelegableOpenActionRequest =
  | LegacyCollectRequest
  | SimpleCollectRequest
  | UnknownActionRequest;

export function isCollectRequest(request: OpenActionRequest): request is CollectRequest {
  return [
    AllOpenActionType.LEGACY_COLLECT,
    AllOpenActionType.MULTIRECIPIENT_COLLECT,
    AllOpenActionType.SHARED_REVENUE_COLLECT,
    AllOpenActionType.SIMPLE_COLLECT,
  ].includes(request.type);
}

export function isUnknownActionRequest(
  request: OpenActionRequest,
): request is UnknownActionRequest {
  return request.type === AllOpenActionType.UNKNOWN_OPEN_ACTION;
}

type PaidCollectRequest = CollectRequest & { fee: CollectFee | MintFee };

/**
 * @internal
 */
export function isPaidCollectRequest(request: OpenActionRequest): request is PaidCollectRequest {
  return isCollectRequest(request) && 'fee' in request && request.fee !== undefined;
}

function isPublicOpenActionRequest(
  request: OpenActionRequest,
): request is SimpleCollectRequest | MultirecipientCollectRequest | UnknownActionRequest {
  return 'public' in request && request.public;
}

export type IOpenActionPresenter = ITransactionResultPresenter<
  OpenActionRequest,
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
>;

export class OpenAction extends SponsorshipReady<OpenActionRequest> {
  constructor(
    private readonly tokenAvailability: TokenAvailability,
    private readonly signedExecution: SignedOnChain<OpenActionRequest>,
    private readonly delegableExecution: DelegableSigning<OpenActionRequest>,
    private readonly paidExecution: PaidTransaction<OpenActionRequest>,
    private readonly presenter: IOpenActionPresenter,
  ) {
    super();
  }

  protected async charged(request: OpenActionRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected async sponsored(request: OpenActionRequest): Promise<void> {
    if (isPaidCollectRequest(request)) {
      const result = await this.tokenAvailability.checkAvailability({
        amount: request.fee.amount,
        spender: request.fee.contractAddress,
      });

      if (result.isFailure()) {
        this.presenter.present(result);
        return;
      }

      if (isPublicOpenActionRequest(request)) {
        return this.charged(request);
      }

      await this.signedExecution.execute(request);
      return;
    }

    if (isPublicOpenActionRequest(request)) {
      return this.charged(request);
    }

    await this.delegableExecution.execute(request);
  }
}
