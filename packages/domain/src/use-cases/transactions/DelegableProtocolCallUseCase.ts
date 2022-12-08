import { success } from '@lens-protocol/shared-kernel';

import { NativeTransaction, TransactionRequestModel } from '../../entities';
import { ActiveWallet } from '../wallets/ActiveWallet';
import {
  IProtocolCallPresenter,
  IMetaTransactionNonceGateway,
  IProtocolCallRelayer,
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from './ProtocolCallUseCase';
import { TransactionQueue } from './TransactionQueue';

export type WithDelegateFlag<T extends TransactionRequestModel> = T extends { delegate: boolean }
  ? T
  : never;

export interface IProtocolCallGateway<T extends TransactionRequestModel>
  extends IUnsignedProtocolCallGateway<T> {
  createDelegatedTransaction(request: T): Promise<NativeTransaction<T>>;
}

export type { IProtocolCallPresenter };

export class DelegableProtocolCallUseCase<
  T extends TransactionRequestModel,
> extends ProtocolCallUseCase<T> {
  constructor(
    activeWallet: ActiveWallet,
    metaTransactionNonceGateway: IMetaTransactionNonceGateway,
    protected readonly protocolCallGateway: IProtocolCallGateway<T>,
    protocolCallRelayer: IProtocolCallRelayer<T>,
    transactionQueue: TransactionQueue<TransactionRequestModel>,
    protected readonly presenter: IProtocolCallPresenter,
  ) {
    super(
      activeWallet,
      metaTransactionNonceGateway,
      protocolCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );
  }

  async execute(request: WithDelegateFlag<T>): Promise<void> {
    if (request.delegate) {
      const transaction = await this.protocolCallGateway.createDelegatedTransaction(request);

      await this.transactionQueue.push(transaction);

      this.presenter.present(success());
      return;
    }
    return super.execute(request);
  }
}
