import { Authentication, Credentials } from './authentication';
import { LensConfig } from './consts/config';
import { Profile } from './profile';
import { Reactions } from './reactions';

export class LensClient {
  private authentication: Authentication;
  private credentials?: Credentials;
  private config: LensConfig;

  private constructor(config: LensConfig) {
    this.authentication = new Authentication(config);
    this.config = config;
  }

  static init(config: LensConfig): LensClient {
    return new LensClient(config);
  }

  async generateChallenge(address: string): Promise<string> {
    return this.authentication.challenge(address);
  }

  async authenticate(address: string, signature: string): Promise<void> {
    this.credentials = await this.authentication.authenticate(address, signature);
  }

  get profile(): Profile {
    return new Profile(this.config);
  }

  get reactions(): Reactions {
    return new Reactions(this.config, this.credentials);
  }
}
