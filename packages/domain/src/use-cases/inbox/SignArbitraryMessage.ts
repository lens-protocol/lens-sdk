import { Result } from '@lens-protocol/shared-kernel';

import {
  PendingSigningRequestError,
  Signature,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../wallets';

type SignMessageResult = Result<
  Signature,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

interface ISignArbitraryMessagePresenter {
  present(result: SignMessageResult): void;
}

export class SignArbitraryMessage {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly presenter: ISignArbitraryMessagePresenter,
  ) {}

  async execute(request: string): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const result = await wallet.signMessage(request);
    this.presenter.present(result);
  }
}
