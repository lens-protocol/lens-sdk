import {
  AnyTransactionRequestModel,
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../authentication/ActiveWallet';
import { IPaidTransactionGateway } from './IPaidTransactionGateway';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
import { TransactionQueue } from './TransactionQueue';

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
