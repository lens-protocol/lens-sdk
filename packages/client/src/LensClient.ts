import { Authentication } from './authentication';
import { LensConfig } from './consts/config';
import { Explore } from './explore';
import { Profile } from './profile';
import { Reactions } from './reactions';
import { Search } from './search';

export class LensClient {
  private readonly authentication: Authentication;
  private readonly config: LensConfig;

  constructor(config: LensConfig) {
    this.authentication = new Authentication(config);
    this.config = config;
  }

  async generateChallenge(address: string) {
    return this.authentication.generateChallenge(address);
  }

  async authenticate(address: string, signature: string) {
    await this.authentication.authenticate(address, signature);
  }

  async isAuthenticated() {
    return this.authentication.isAuthenticated();
  }

  get profile(): Profile {
    return new Profile(this.config);
  }

  get reactions(): Reactions {
    return new Reactions(this.config, this.authentication);
  }

  get search(): Search {
    return new Search(this.config);
  }

  get explore(): Explore {
    return new Explore(this.config);
  }
}
