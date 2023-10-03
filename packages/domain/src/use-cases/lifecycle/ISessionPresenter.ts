import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';
import type { LogoutReason } from '../wallets';

/**
 * The identifier of a Profile
 */
export type ProfileIdentifier = {
  id: ProfileId;
  handle: string;
};

/**
 * Framework-agnostic Wallet representation
 */
export type WalletData = {
  address: EvmAddress;
};

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

export interface ISessionPresenter {
  anonymous(): void;

  authenticated(wallet: WalletData, profile: ProfileIdentifier | null): void;

  switchProfile(profile: ProfileIdentifier): void;

  logout(data: LogoutData): void;
}
