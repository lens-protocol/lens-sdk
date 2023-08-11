import { failure } from '@lens-protocol/shared-kernel';

import {
  InsufficientGasError,
  PendingSigningRequestError,
  AnyTransactionRequestModel,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { UnsignedTransaction } from '../../entities/Transactions';
import { ActiveWallet } from '../wallets/ActiveWallet';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface IPayTransactionGateway<T extends AnyTransactionRequestModel> {
  prepareSelfFundedTransaction(request: T, wallet: Wallet): Promise<UnsignedTransaction<T>>;
}

export type IPayTransactionPresenter<T extends AnyTransactionRequestModel> =
  ITransactionResultPresenter<
    T,
    PendingSigningRequestError | InsufficientGasError | UserRejectedError | WalletConnectionError
  >;

export class PayTransaction<T extends AnyTransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IPayTransactionGateway<T>,
    private readonly presenter: IPayTransactionPresenter<T>,
    private readonly queue: TransactionQueue<AnyTransactionRequestModel>,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const approveTransaction = await this.gateway.prepareSelfFundedTransaction(request, wallet);

    const relayResult = await wallet.sendTransaction(approveTransaction);

    if (relayResult.isFailure()) {
      this.presenter.present(failure(relayResult.error));
      return;
    }

    const transaction = relayResult.value;
    await this.queue.push(transaction, this.presenter);
  }
}
