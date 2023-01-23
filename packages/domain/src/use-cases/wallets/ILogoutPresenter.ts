import { WalletData } from './IActiveWalletPresenter';
import { IGenericResultPresenter } from '../transactions';

export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

export type LogoutData = {
  lastLoggedInWallet: WalletData | null;
  logoutReason: LogoutReason;
};

export type ILogoutPresenter = IGenericResultPresenter<LogoutData, never>;
