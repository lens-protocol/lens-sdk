import { DateUtils, invariant, never } from '@lens-protocol/shared-kernel';
import jwtDecode from 'jwt-decode';

export class ClockSkewedError extends Error {
  name = 'ClockSkewedError' as const;
  message = 'Your system clock is skewed compared to the API clock';
}

// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(30);

const CLOCK_SKEWED_THRESHOLD = DateUtils.secondsToMs(10);

type WalletJwtPayload = {
  authorizationId: string;
  id: string; // EvmAddress;
  role: 'wallet_refresh';
  iat: number;
  exp: number;
};

type ProfileJwtPayload = {
  authorizationId: string;
  id: string; // ProfileId
  evmAddress: string;
  role: 'profile_refresh';
  iat: number;
  exp: number;
};

type JwtPayload = WalletJwtPayload | ProfileJwtPayload;

type DecodedJwt = { [key: string]: string | number };

function isWalletJwtContent(decodedJwt: DecodedJwt): decodedJwt is WalletJwtPayload {
  return 'role' in decodedJwt && decodedJwt.role === 'wallet_refresh';
}

function isProfileJwtContent(decodedJwt: DecodedJwt): decodedJwt is ProfileJwtPayload {
  return 'role' in decodedJwt && decodedJwt.role === 'profile_refresh';
}

export class Credentials {
  constructor(
    readonly accessToken: string | undefined,
    readonly identityToken: string | undefined,
    readonly refreshToken: string,
  ) {}

  checkClock() {
    const decodedToken = jwtDecode<JwtPayload>(this.refreshToken);
    invariant(decodedToken.iat, 'Issued at date should be provided by JWT token');

    // check if local time is not too far off from server time
    const diff = Math.abs(DateUtils.secondsToMs(decodedToken.iat) - Date.now());
    if (diff > CLOCK_SKEWED_THRESHOLD) {
      // throw new ClockSkewedError();

      // eslint-disable-next-line no-console
      console.info(
        'ClockSkewedError: Your system clock is skewed compared to the API clock by: ',
        diff,
      );
    }
  }

  canRefresh(): boolean {
    const now = Date.now();
    const tokenExpTimestamp = this.getTokenExpTimestamp(this.refreshToken);

    return now < tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
  }

  shouldRefresh(): boolean {
    const accessToken = this.accessToken;

    if (!accessToken) {
      return true;
    }

    const now = Date.now();
    const tokenExpTimestamp = this.getTokenExpTimestamp(accessToken);

    return now >= tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
  }

  getProfileId(): string | null {
    const decodedToken = jwtDecode<JwtPayload>(this.refreshToken);

    if (isProfileJwtContent(decodedToken)) {
      return decodedToken.id;
    }

    return null;
  }

  getWalletAddress(): string {
    const decodedToken = jwtDecode<JwtPayload>(this.refreshToken);

    if (isWalletJwtContent(decodedToken)) {
      return decodedToken.id;
    }

    if (isProfileJwtContent(decodedToken)) {
      return decodedToken.evmAddress;
    }

    never('Invalid JWT format');
  }

  getAuthorizationId(): string {
    const decodedToken = jwtDecode<JwtPayload>(this.refreshToken);
    invariant(decodedToken.authorizationId, 'Wrong JWT token');

    return decodedToken.authorizationId;
  }

  private getTokenExpTimestamp(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    invariant(decodedToken.exp, 'Exp date should be provided by JWT token');

    return DateUtils.secondsToMs(decodedToken.exp);
  }
}
