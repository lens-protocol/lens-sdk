import { Logout, LogoutReason } from '@lens-protocol/domain/use-cases/authentication';

export type Callback = () => void;

export interface ICredentialsExpiryEmitter {
  onExpiry(callback: Callback): void;
}

export class CredentialsExpiryController {
  constructor(readonly logout: Logout) {}

  subscribe(tokenExpiryEmitter: ICredentialsExpiryEmitter) {
    tokenExpiryEmitter.onExpiry(() => {
      void this.onTokenExpired();
    });
  }

  private async onTokenExpired(): Promise<void> {
    await this.logout.execute(LogoutReason.CREDENTIALS_EXPIRED);
  }
}
