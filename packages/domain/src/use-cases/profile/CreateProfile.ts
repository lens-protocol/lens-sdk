import { EvmAddress } from '@lens-protocol/shared-kernel';

import {
  AnyTransactionRequestModel,
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { IPaidTransactionGateway } from '../transactions/IPaidTransactionGateway';
import { ITransactionResultPresenter } from '../transactions/ITransactionResultPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { IWalletFactory } from '../wallets/IWalletFactory';
import { FollowPolicyConfig } from './FollowPolicy';

export type CreateProfileRequest = {
  kind: TransactionKind.CREATE_PROFILE;
  to: EvmAddress;
  localName: string;
  approveSignless: boolean;
  followPolicy?: FollowPolicyConfig;
};

export type ICreateProfileTransactionGateway = IPaidTransactionGateway<CreateProfileRequest>;

export type ICreateProfileTransactionPresenter = ITransactionResultPresenter<
  CreateProfileRequest,
  PendingSigningRequestError | InsufficientGasError | UserRejectedError | WalletConnectionError
>;

export class CreateProfile {
  constructor(
    private readonly walletFactory: IWalletFactory,
    private readonly gateway: ICreateProfileTransactionGateway,
    private readonly presenter: ICreateProfileTransactionPresenter,
    private readonly queue: TransactionQueue<AnyTransactionRequestModel>,
  ) {}

  async execute(request: CreateProfileRequest) {
    const wallet = await this.walletFactory.create(request.to);

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
