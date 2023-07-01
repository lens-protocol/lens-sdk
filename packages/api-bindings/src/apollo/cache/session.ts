import { makeVar, useReactiveVar } from '@apollo/client';
import { ProfileIdentifier, WalletData } from '@lens-protocol/domain/use-cases/lifecycle';

export enum SessionType {
  Anonymous = 'ANONYMOUS',
  JustWallet = 'JUST_WALLET',
  WithProfile = 'WITH_PROFILE',
}

/**
 * @experimental
 */
class NotAuthenticatedSession<TWallet, TProfile> {
  readonly type = SessionType.Anonymous;

  isAuthenticated(): this is
    | AuthenticatedWalletSession<TWallet, TProfile>
    | AuthenticatedProfileSession<TWallet, TProfile> {
    return false;
  }

  isNotAuthenticated(): this is NotAuthenticatedSession<TWallet, TProfile> {
    return true;
  }
}

/**
 * @experimental
 */
class AuthenticatedWalletSession<TWallet, TProfile> {
  readonly type = SessionType.JustWallet;

  constructor(readonly wallet: TWallet) {}

  isAuthenticated(): this is
    | AuthenticatedWalletSession<TWallet, TProfile>
    | AuthenticatedProfileSession<TWallet, TProfile> {
    return true;
  }

  isNotAuthenticated(): this is NotAuthenticatedSession<TWallet, TProfile> {
    return false;
  }
}

/**
 * @experimental
 */
class AuthenticatedProfileSession<TWallet, TProfile> {
  readonly type = SessionType.WithProfile;

  constructor(readonly wallet: TWallet, readonly profile: TProfile) {}

  isAuthenticated(): this is
    | AuthenticatedWalletSession<TWallet, TProfile>
    | AuthenticatedProfileSession<TWallet, TProfile> {
    return true;
  }

  isNotAuthenticated(): this is NotAuthenticatedSession<TWallet, TProfile> {
    return false;
  }
}

export type { NotAuthenticatedSession, AuthenticatedWalletSession, AuthenticatedProfileSession };

export function notAuthenticated() {
  return new NotAuthenticatedSession<never, never>();
}

export function authenticatedWallet<T extends WalletData>(wallet: T) {
  return new AuthenticatedWalletSession<T, never>(wallet);
}

export function authenticatedProfile<
  TWallet extends WalletData,
  TProfile extends ProfileIdentifier,
>(wallet: TWallet, profile: TProfile) {
  return new AuthenticatedProfileSession(wallet, profile);
}

export function authenticatedWith<TWallet extends WalletData, TProfile extends ProfileIdentifier>(
  wallet: TWallet,
  profile: TProfile | null,
) {
  if (profile === null) {
    return authenticatedWallet(wallet);
  }
  return authenticatedProfile(wallet, profile);
}

/**
 * @experimental
 */
export type Session<TWallet extends WalletData, TProfile extends ProfileIdentifier> =
  | NotAuthenticatedSession<never, never>
  | AuthenticatedWalletSession<TWallet, never>
  | AuthenticatedProfileSession<TWallet, TProfile>;

const sessionVar = makeVar<Session<WalletData, ProfileIdentifier> | null>(null);

export function getSession() {
  return sessionVar();
}

export function useSessionVar() {
  return useReactiveVar(sessionVar);
}

export function resetSession() {
  sessionVar(null);
}

export function updateSession(session: Session<WalletData, ProfileIdentifier>) {
  sessionVar(session);
}
