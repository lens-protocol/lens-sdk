import {
  authenticatedProfile,
  authenticatedWallet,
  getSession,
  notAuthenticated,
  updateSession,
} from '@lens-protocol/api-bindings';
import {
  ISessionPresenter,
  LogoutData,
  ProfileIdentifier,
  WalletData,
} from '@lens-protocol/domain/use-cases/lifecycle';
import { invariant } from '@lens-protocol/shared-kernel';

/**
 * Handler for logging out
 */
export type LogoutHandler = (data: LogoutData) => void;

export class SessionPresenter implements ISessionPresenter {
  constructor(private readonly logoutHandler: LogoutHandler) {}

  anonymous(): void {
    updateSession(notAuthenticated());
  }

  authenticated(wallet: WalletData, profile: ProfileIdentifier | null): void {
    if (profile) {
      updateSession(authenticatedProfile(wallet, profile));
    } else {
      updateSession(authenticatedWallet(wallet));
    }
  }

  switchProfile(profile: ProfileIdentifier): void {
    const session = getSession();

    invariant(session?.isAuthenticated(), 'Cannot switch profile on a non-authenticated session');

    updateSession(authenticatedProfile(session.wallet, profile));
  }

  logout(data: LogoutData): void {
    this.logoutHandler(data);
    updateSession(notAuthenticated());
  }
}
