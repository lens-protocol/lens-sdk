import { LogoutReason, WalletLogout } from '@lens-protocol/domain/use-cases/wallets';

export type Callback = () => void;

export interface ICredentialsExpiryEmitter {
  onExpiry(callback: Callback): void;
}

export class CredentialsExpiryController {
  constructor(readonly walletLogout: WalletLogout) {}

  subscribe(tokenExpiryEmitter: ICredentialsExpiryEmitter) {
    tokenExpiryEmitter.onExpiry(() => {
      void this.onTokenExpired();
    });
  }

  private async onTokenExpired(): Promise<void> {
    await this.walletLogout.logout(LogoutReason.CREDENTIALS_EXPIRED);
  }
}
