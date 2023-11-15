import {
  InsufficientGasError,
  PendingSigningRequestError,
  AnyTransactionRequestModel,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { UnsignedTransaction } from '../../entities/Transactions';
import { ActiveWallet } from '../authentication/ActiveWallet';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface IPaidTransactionGateway<T extends AnyTransactionRequestModel> {
  createUnsignedTransaction(request: T, wallet: Wallet): Promise<UnsignedTransaction<T>>;
}

export type IPaidTransactionPresenter<T extends AnyTransactionRequestModel> =
  ITransactionResultPresenter<
    T,
    PendingSigningRequestError | InsufficientGasError | UserRejectedError | WalletConnectionError
  >;

export class PaidTransaction<T extends AnyTransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IPaidTransactionGateway<T>,
    private readonly presenter: IPaidTransactionPresenter<T>,
    private readonly queue: TransactionQueue<AnyTransactionRequestModel>,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const unsigned = await this.gateway.createUnsignedTransaction(request, wallet);

    const result = await wallet.sendTransaction(unsigned);

    if (result.isFailure()) {
      this.presenter.present(result);
      return;
    }

    const transaction = result.value;
    await this.queue.push(transaction, this.presenter);
  }
}
