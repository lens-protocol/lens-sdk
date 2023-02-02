import { invariant } from '@lens-protocol/shared-kernel';

import { Authentication, Credentials } from './authentication';
import { Environment } from './consts/environments';
import { Profile } from './profile';
import { Reaction } from './reaction';

export class LensClient {
  private authentication: Authentication;
  private credentials: Credentials | null;
  private environment: Environment;

  private constructor(environment: Environment) {
    this.authentication = new Authentication(environment);
    this.credentials = null;
    this.environment = environment;
  }

  static init(environment: Environment): LensClient {
    return new LensClient(environment);
  }

  async generateChallenge(address: string): Promise<string> {
    return this.authentication.challenge(address);
  }

  async isAccessTokenValid(accessToken: string): Promise<boolean> {
    return this.authentication.verify(accessToken);
  }

  async authenticate(address: string, signature: string): Promise<Credentials> {
    this.credentials = await this.authentication.authenticate(address, signature);
    return this.credentials;
  }

  async refreshCredentials(refreshToken?: string): Promise<Credentials> {
    const refreshTokenToUse = refreshToken || this.credentials?.refreshToken;

    invariant(refreshTokenToUse, 'Refresh token is not available');

    this.credentials = await this.authentication.refresh(refreshTokenToUse);
    return this.credentials;
  }

  get profile(): Profile {
    return new Profile(this.environment);
  }

  get reaction(): Reaction {
    if (!this.credentials) {
      throw new Error('Not authenticated');
    }
    return new Reaction(this.environment, this.credentials.accessToken);
  }
}
