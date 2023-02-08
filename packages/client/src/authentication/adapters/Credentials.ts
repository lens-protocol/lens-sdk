import { DateUtils, invariant } from '@lens-protocol/shared-kernel';
import jwtDecode, { JwtPayload } from 'jwt-decode';

// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(30);

export class Credentials {
  constructor(readonly accessToken: string | undefined, readonly refreshToken: string) {}

  canRefresh(): boolean {
    const now = Date.now();
    const tokenExpTimestamp = this.getTokenExpTimestamp(this.refreshToken);

    return now < tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
  }

  isExpired(): boolean {
    const accessToken = this.accessToken;

    if (!accessToken) {
      return true;
    }

    const now = Date.now();
    const tokenExpTimestamp = this.getTokenExpTimestamp(accessToken);

    return now >= tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
  }

  private getTokenExpTimestamp(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);

    invariant(decodedToken.exp, 'Exp date should be provided by JWT token');

    return DateUtils.secondsToMs(decodedToken.exp);
  }
}
