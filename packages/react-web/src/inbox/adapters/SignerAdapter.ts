import {
  PendingSigningRequestError,
  Signature,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import type { ActiveWallet } from '@lens-protocol/domain/use-cases/authentication';
import { SignArbitraryMessage } from '@lens-protocol/domain/use-cases/inbox';
import { IEquatableError } from '@lens-protocol/react';
import { Deferred, Result } from '@lens-protocol/shared-kernel';
import { Signer as XmtpSigner } from '@xmtp/react-sdk';

class PromiseResultPresenter<T, E extends IEquatableError> {
  private deferredResult = new Deferred<Result<T, E>>();

  present(result: Result<T, E>): void {
    this.deferredResult.resolve(result);
  }

  asResult(): Promise<Result<T, E>> {
    return this.deferredResult.promise;
  }
}

export class SignerAdapter implements XmtpSigner {
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
