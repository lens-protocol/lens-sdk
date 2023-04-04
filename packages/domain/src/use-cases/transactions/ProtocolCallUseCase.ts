import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  IUnsignedProtocolCall,
  Nonce,
  TransactionKind,
  SignedProtocolCall,
  TransactionRequestModel,
  MetaTransaction,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../wallets/ActiveWallet';
import { IGenericResultPresenter } from './IGenericResultPresenter';
import { BroadcastingError } from './BroadcastingError';
import { TransactionQueue } from './TransactionQueue';

export interface IMetaTransactionNonceGateway {
  getNextMetaTransactionNonceFor(kind: TransactionKind): Promise<Nonce | undefined>;
}

export interface IProtocolCallRelayer<T extends TransactionRequestModel> {
  relayProtocolCall(
    signedCall: SignedProtocolCall<T>,
  ): PromiseResult<MetaTransaction<T>, BroadcastingError>;
}

export interface IUnsignedProtocolCallGateway<T extends TransactionRequestModel> {
  createUnsignedProtocolCall(request: T, nonceOverride?: Nonce): Promise<IUnsignedProtocolCall<T>>;
}

export type IProtocolCallPresenter = IGenericResultPresenter<
  void,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export class ProtocolCallUseCase<T extends TransactionRequestModel> {
  constructor(
    protected readonly activeWallet: ActiveWallet,
    protected readonly metaTransactionNonceGateway: IMetaTransactionNonceGateway,
    protected readonly unsignedProtocolCallGateway: IUnsignedProtocolCallGateway<T>,
    protected readonly protocolCallRelayer: IProtocolCallRelayer<T>,
    protected readonly transactionQueue: TransactionQueue<TransactionRequestModel>,
    protected readonly presenter: IProtocolCallPresenter,
  ) {}

  async execute(request: T) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const nonce = await this.metaTransactionNonceGateway.getNextMetaTransactionNonceFor(
      request.kind,
    );

    const unsignedCall = await this.unsignedProtocolCallGateway.createUnsignedProtocolCall(
      request,
      nonce,
    );

    const signingResult = await wallet.signProtocolCall(unsignedCall);

    if (signingResult.isFailure()) {
      this.presenter.present(failure(signingResult.error));
      return;
    }

    const relayResult = await this.protocolCallRelayer.relayProtocolCall(signingResult.value);

    if (relayResult.isFailure()) {
      this.presenter.present(failure(relayResult.error));
      return;
    }

    const transaction = relayResult.value;
    await this.transactionQueue.push(transaction);

    this.presenter.present(success());
  }
}
