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

export interface IOffChainRelayer<T extends ProtocolTransactionRequestModel> {
  relayProtocolCall(
    signedCall: ISignedProtocolCall<T>,
  ): PromiseResult<DataTransaction<T>, BroadcastingError>;
}

export interface IOffChainProtocolCallGateway<T extends ProtocolTransactionRequestModel> {
  createUnsignedProtocolCall(request: T): Promise<IUnsignedProtocolCall<T>>;
}

export type ISubsidizeOffChainPresenter<T extends ProtocolTransactionRequestModel> =
  ITransactionResultPresenter<
    T,
    BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

// TODO rename to Momoka for more clarity
export class SubsidizeOffChain<T extends ProtocolTransactionRequestModel>
  implements ISignedOperation<T>
{
  constructor(
    protected readonly activeWallet: ActiveWallet,
    protected readonly gateway: IOffChainProtocolCallGateway<T>,
    protected readonly relayer: IOffChainRelayer<T>,
    protected readonly queue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISubsidizeOffChainPresenter<T>,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const unsignedCall = await this.gateway.createUnsignedProtocolCall(request);

    const signingResult = await wallet.signProtocolCall(unsignedCall);

    if (signingResult.isFailure()) {
      this.presenter.present(signingResult);
      return;
    }

    const relayResult = await this.relayer.relayProtocolCall(signingResult.value);

    if (relayResult.isFailure()) {
      this.presenter.present(relayResult);
      return;
    }

    const transaction = relayResult.value;
    await this.queue.push(transaction as Transaction<T>, this.presenter);
  }
}
