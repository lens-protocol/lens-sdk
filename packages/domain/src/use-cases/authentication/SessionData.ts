import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';
import { LogoutReason } from './Logout';

/**
 * The type of user's session.
 */
export enum SessionType {
  Anonymous = 'ANONYMOUS',
  WithProfile = 'WITH_PROFILE',
  JustWallet = 'JUST_WALLET',
}

/**
 * A not authenticated user's session
 *
 * @internal
 */
export type AnonymousSessionData = {
  /**
   * The union discriminant.
   */
  type: SessionType.Anonymous;
  /**
   * The reason the previous session ended.
   */
  lastLogoutReason?: LogoutReason;
};

/**
 * A typical authenticated user's session.
 *
 * @internal
 */
export type ProfileSessionData = {
  /**
   * The union discriminant.
   */
  type: SessionType.WithProfile;
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
  /**
   * The authenticated Profile ID.
   */
  profileId: ProfileId;
};

/**
 * An authenticated user's session with just a wallet address.
 *
 * This is currently not used, but will be used in the future.
 *
 * @internal
 */
export type WalletOnlySessionData = {
  /**
   * The union discriminant.
   */
  type: SessionType.JustWallet;
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
};

/**
 * Describes the details of a user's session.
 *
 * @internal
 */
export type SessionData = AnonymousSessionData | ProfileSessionData | WalletOnlySessionData;

/**
 * @internal
 */
export function anonymousSessionData(lastLogoutReason?: LogoutReason): AnonymousSessionData {
  return {
    type: SessionType.Anonymous,
    lastLogoutReason,
  };
}

/**
 * @internal
 */
export function profileSessionData({
  address,
  profileId,
}: {
  address: EvmAddress;
  profileId: ProfileId;
}): ProfileSessionData {
  return {
    type: SessionType.WithProfile,
    address,
    profileId,
  };
}

/**
 * @internal
 */
export function walletOnlySessionData({ address }: { address: EvmAddress }): WalletOnlySessionData {
  return {
    type: SessionType.JustWallet,
    address,
  };
}
