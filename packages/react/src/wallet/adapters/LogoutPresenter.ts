import { ILogoutPresenter, LogoutData } from '@lens-protocol/domain/use-cases/wallets';

export type LogoutHandler = (data: LogoutData) => void;

export class LogoutPresenter implements ILogoutPresenter {
  constructor(private readonly logoutHandler: LogoutHandler) {}

  presentLogout(data: LogoutData): void {
    this.logoutHandler(data);
  }
}
