import {
  PendingSigningRequestError,
  Signature,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { SignArbitraryMessage } from '@lens-protocol/domain/use-cases/inbox';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResultPresenter } from '@lens-protocol/react';
import { Signer } from '@xmtp/react-sdk';

export class SignerAdapter implements Signer {
  constructor(private activeWallet: ActiveWallet) {}

  async getAddress() {
    const wallet = await this.activeWallet.requireActiveWallet();

    return wallet.address;
  }

  async signMessage(request: string) {
    const presenter = new PromiseResultPresenter<
      Signature,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();

    const useCase = new SignArbitraryMessage(this.activeWallet, presenter);

    await useCase.execute(request);

    const result = await presenter.asResult();

    return result.unwrap();
  }
}
