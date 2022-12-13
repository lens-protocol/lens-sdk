import { Amount, Erc20, EthereumAddress, failure, success } from '@lens-protocol/shared-kernel';

import {
  UnsignedTransaction,
  TransactionKind,
  UserRejectedError,
  InsufficientGasError,
  Wallet,
  WalletConnectionError,
  PendingSigningRequestError,
  TransactionRequestModel,
} from '../../entities';
import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { ActiveWallet } from './ActiveWallet';

export enum TokenAllowanceLimit {
  EXACT,
  INFINITE,
}

export type TokenAllowanceRequest = {
  amount: Amount<Erc20>;
  spender: EthereumAddress;
  limit: TokenAllowanceLimit;
  kind: TransactionKind.APPROVE_MODULE;
};

export type UnsignedTokenAllowanceTransaction = UnsignedTransaction<TokenAllowanceRequest>;

export interface IApproveTransactionGateway {
  createApproveTransaction(
    request: TokenAllowanceRequest,
    wallet: Wallet,
  ): Promise<UnsignedTokenAllowanceTransaction>;
}

export type ITokenAllowancePresenter = IGenericResultPresenter<
  void,
  PendingSigningRequestError | InsufficientGasError | UserRejectedError | WalletConnectionError
>;

export class TokenAllowance {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IApproveTransactionGateway,
    private readonly presenter: ITokenAllowancePresenter,
    private readonly queue: TransactionQueue<TransactionRequestModel>,
  ) {}

  async increaseAllowance(request: TokenAllowanceRequest) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const approveTransaction = await this.gateway.createApproveTransaction(request, wallet);

    const relayResult = await wallet.sendTransaction(approveTransaction);

    if (relayResult.isFailure()) {
      this.presenter.present(failure(relayResult.error));
      return;
    }

    const transaction = relayResult.value;
    await this.queue.push(transaction);

    this.presenter.present(success());
  }
}
