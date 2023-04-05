import { Brand, failure, success } from '@lens-protocol/shared-kernel';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionRequestModel,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { UnsignedTransaction } from '../../entities/Transactions';
import { ActiveWallet } from '../wallets';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export type Data = Brand<string, 'Data'>;

export type WithData<T extends TransactionRequestModel> = T extends { data: Data } ? T : never;

export interface IPayTransactionGateway<T extends TransactionRequestModel> {
  prepareSelfFundedTransaction(
    request: WithData<T>,
    wallet: Wallet,
  ): Promise<UnsignedTransaction<T>>;
}

export type IPayTransactionPresenter = IGenericResultPresenter<
  void,
  PendingSigningRequestError | InsufficientGasError | UserRejectedError | WalletConnectionError
>;

export class PayTransaction<T extends TransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IPayTransactionGateway<T>,
    private readonly presenter: IPayTransactionPresenter,
    private readonly queue: TransactionQueue<TransactionRequestModel>,
  ) {}

  async execute(request: WithData<T>) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const approveTransaction = await this.gateway.prepareSelfFundedTransaction(request, wallet);

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
