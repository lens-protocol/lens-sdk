import { DateUtils, invariant } from '@lens-protocol/shared-kernel';
import jwtDecode from 'jwt-decode';

export class ClockSkewedError extends Error {
  name = 'ClockSkewedError' as const;
  message = 'Your system clock is skewed compared to the API clock';
}
// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(30);

const CLOCK_SKEWED_THRESHOLD = DateUtils.secondsToMs(10);

type LensJwtPayload = {
  id: string;
  evmAddress: string;
  role: string;
  iat: number;
  exp: number;
};

export class Credentials {
  constructor(
    readonly accessToken: string | undefined,
    readonly refreshToken: string,
  ) {}

  checkClock() {
    const decodedToken = jwtDecode<LensJwtPayload>(this.refreshToken);
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

  getProfileId(): string {
    const decodedToken = jwtDecode<LensJwtPayload>(this.refreshToken);
    invariant(decodedToken.id, 'ProfileId should be provided by JWT token');

    return decodedToken.id;
  }

  private getTokenExpTimestamp(token: string) {
    const decodedToken = jwtDecode<LensJwtPayload>(token);

    invariant(decodedToken.exp, 'Exp date should be provided by JWT token');

    return DateUtils.secondsToMs(decodedToken.exp);
  }
}
