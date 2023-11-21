import { PromiseResult } from '@lens-protocol/shared-kernel';

import {
  AnyTransactionRequestModel,
  DataTransaction,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  PendingSigningRequestError,
  ProtocolTransactionRequestModel,
  Transaction,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../authentication/ActiveWallet';
import { BroadcastingError } from './BroadcastingError';
import { ISignedOperation } from './DelegableSigning';
import { ITransactionResultPresenter } from './ITransactionResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface IMomokaRelayer<T extends ProtocolTransactionRequestModel> {
  relaySignedMomoka(
    signedCall: ISignedProtocolCall<T>,
  ): PromiseResult<DataTransaction<T>, BroadcastingError>;
}

export interface ISignedMomokaGateway<T extends ProtocolTransactionRequestModel> {
  createUnsignedProtocolCall(request: T): Promise<IUnsignedProtocolCall<T>>;
}

export type ISignedMomokaPresenter<T extends ProtocolTransactionRequestModel> =
  ITransactionResultPresenter<
    T,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

export class SubsidizeOffChain<T extends ProtocolTransactionRequestModel>
  implements ISignedOperation<T>
{
  constructor(
    protected readonly activeWallet: ActiveWallet,
    protected readonly gateway: ISignedMomokaGateway<T>,
    protected readonly relayer: IMomokaRelayer<ProtocolTransactionRequestModel>,
    protected readonly queue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISignedMomokaPresenter<T>,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const unsignedCall = await this.gateway.createUnsignedProtocolCall(request);

    const signingResult = await wallet.signProtocolCall(unsignedCall);

    if (signingResult.isFailure()) {
      this.presenter.present(signingResult);
      return;
    }

    const relayResult = await this.relayer.relaySignedMomoka(signingResult.value);

    if (relayResult.isFailure()) {
      this.presenter.present(relayResult);
      return;
    }

    const transaction = relayResult.value;
    await this.queue.push(transaction as Transaction<T>, this.presenter);
  }
}
