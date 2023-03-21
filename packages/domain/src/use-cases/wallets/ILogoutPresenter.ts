import { IGenericResultPresenter } from '../transactions';
import { WalletData } from './IActiveWalletPresenter';

/**
 * The reason for logging out
 */
export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

/**
 * Data returned when logging out
 */
export type LogoutData = {
  /**
   * @internal
   */
  lastLoggedInWallet: WalletData | null;

  /**
   * The reason for logging out
   */
  logoutReason: LogoutReason;
};

export type ILogoutPresenter = IGenericResultPresenter<LogoutData, never>;
