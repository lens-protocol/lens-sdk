import { ICredentials, ProfileId } from '@lens-protocol/domain/entities';
import { DateUtils, EvmAddress, invariant, never } from '@lens-protocol/shared-kernel';
import jwtDecode from 'jwt-decode';
import isObject from 'lodash/isObject';

type WalletJwtPayload = {
  authorizationId: string;
  id: EvmAddress;
  role: 'wallet_refresh';
  iat: number;
  exp: number;
};

type ProfileJwtPayload = {
  authorizationId: string;
  id: ProfileId;
  evmAddress: string;
  role: 'profile_refresh';
  iat: number;
  exp: number;
};

function isWalletJwtContent(decodedJwt: unknown): decodedJwt is WalletJwtPayload {
  return isObject(decodedJwt) && 'role' in decodedJwt && decodedJwt.role === 'wallet_refresh';
}

function isProfileJwtContent(decodedJwt: unknown): decodedJwt is ProfileJwtPayload {
  return isObject(decodedJwt) && 'role' in decodedJwt && decodedJwt.role === 'profile_refresh';
}

// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(3);

export class Credentials implements ICredentials {
  readonly address: EvmAddress;
  readonly profileId?: ProfileId;
  readonly authorizationId: string;

  constructor(readonly accessToken: string | null, readonly refreshToken: string) {
    const decodedRefreshToken = jwtDecode(refreshToken);

    if (isWalletJwtContent(decodedRefreshToken)) {
      this.address = decodedRefreshToken.id;
      this.authorizationId = decodedRefreshToken.authorizationId;
      return;
    }

    if (isProfileJwtContent(decodedRefreshToken)) {
      this.address = decodedRefreshToken.evmAddress;
      this.profileId = decodedRefreshToken.id;
      this.authorizationId = decodedRefreshToken.authorizationId;
      return;
    }

    never('Invalid JWT format');
  }

  canRefresh(): boolean {
    const now = Date.now();
    const tokenExpDate = this.getTokenExpDate(this.refreshToken);

    return now < tokenExpDate - TOKEN_EXP_THRESHOLD;
  }

  isExpired(): boolean {
    const accessToken = this.accessToken;

    if (!accessToken) {
      return true;
    }

    const now = Date.now();
    const tokenExpDate = this.getTokenExpDate(accessToken);

    return now >= tokenExpDate - TOKEN_EXP_THRESHOLD;
  }

  private getTokenExpDate(token: string) {
    const decodedToken = jwtDecode<WalletJwtPayload | ProfileJwtPayload>(token);

    invariant(decodedToken.exp, 'Exp date should be provided by JWT token');

    return DateUtils.secondsToMs(decodedToken.exp);
  }
}
