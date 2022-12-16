import { ICredentials } from '@lens-protocol/domain/entities';
import { DateUtils, invariant, InvariantError } from '@lens-protocol/shared-kernel';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import isObject from 'lodash/isObject';

type ParsedJwt = {
  id: string;
};

function assertIdInJwt(decodedJwt: unknown): asserts decodedJwt is ParsedJwt {
  if (isObject(decodedJwt) && !('id' in decodedJwt)) {
    throw new InvariantError('Invalid JWT format.');
  }
}

// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
const TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(3);

export class Credentials implements ICredentials {
  readonly address: string;

  constructor(readonly accessToken: string | null, readonly refreshToken: string) {
    const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);

    assertIdInJwt(decodedRefreshToken);

    this.address = decodedRefreshToken.id;
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

  getAccessTokenExpDate(): number | null {
    const accessToken = this.accessToken;

    if (!accessToken) {
      return null;
    }

    return this.getTokenExpDate(accessToken);
  }

  private getTokenExpDate(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);

    invariant(decodedToken.exp, 'Exp date should be provided by JWT token');

    return DateUtils.secondsToMs(decodedToken.exp);
  }
}
