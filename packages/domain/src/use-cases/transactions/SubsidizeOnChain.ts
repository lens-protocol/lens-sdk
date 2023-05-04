import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  IUnsignedProtocolCall,
  Nonce,
  TransactionKind,
  ISignedProtocolCall,
  AnyTransactionRequestModel,
  MetaTransaction,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  ProtocolTransactionRequestModel,
} from '../../entities';
import { ActiveWallet } from '../wallets/ActiveWallet';
import { BroadcastingError } from './BroadcastingError';
import { ISignedOperation } from './DelegableSigning';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { TransactionQueue } from './TransactionQueue';

export interface IMetaTransactionNonceGateway {
  getNextMetaTransactionNonceFor(kind: TransactionKind): Promise<Nonce | undefined>;
}

export interface IOnChainRelayer<T extends ProtocolTransactionRequestModel> {
  relayProtocolCall(
    signedCall: ISignedProtocolCall<T>,
  ): PromiseResult<MetaTransaction<T>, BroadcastingError>;
}

export interface IOnChainProtocolCallGateway<T extends ProtocolTransactionRequestModel> {
  createUnsignedProtocolCall(request: T, nonceOverride?: Nonce): Promise<IUnsignedProtocolCall<T>>;
}

export type ISubsidizeOnChainPresenter = IGenericResultPresenter<
  void,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export class SubsidizeOnChain<T extends ProtocolTransactionRequestModel>
  implements ISignedOperation<T>
{
  constructor(
    protected readonly activeWallet: ActiveWallet,
    protected readonly metaTransactionNonceGateway: IMetaTransactionNonceGateway,
    protected readonly onChainProtocolCallGateway: IOnChainProtocolCallGateway<T>,
    protected readonly relayer: IOnChainRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    protected readonly presenter: ISubsidizeOnChainPresenter,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const nonce = await this.metaTransactionNonceGateway.getNextMetaTransactionNonceFor(
      request.kind,
    );

    const unsignedCall = await this.onChainProtocolCallGateway.createUnsignedProtocolCall(
      request,
      nonce,
    );

    const signingResult = await wallet.signProtocolCall(unsignedCall);

    if (signingResult.isFailure()) {
      this.presenter.present(failure(signingResult.error));
      return;
    }

    const relayResult = await this.relayer.relayProtocolCall(signingResult.value);

    if (relayResult.isFailure()) {
      this.presenter.present(failure(relayResult.error));
      return;
    }

    const transaction = relayResult.value;
    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
