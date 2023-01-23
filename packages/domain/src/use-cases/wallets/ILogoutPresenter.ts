import { IGenericResultPresenter } from '../transactions';
import { WalletData } from './IActiveWalletPresenter';

export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

export type LogoutData = {
  lastLoggedInWallet: WalletData | null;
  logoutReason: LogoutReason;
};

export interface ILogoutPresenter extends IGenericResultPresenter<void, never> {
  presentLogout(data: LogoutData): void;
}
