import { Authentication, IAuthentication } from './authentication';
import { LensConfig } from './consts/config';
import { Explore } from './explore';
import { Profile } from './profile';
import { Publication } from './publication';
import { Reactions } from './reactions';
import { Revenue } from './revenue';
import { Search } from './search';

export class LensClient {
  private readonly _authentication: Authentication;
  private readonly config: LensConfig;

  constructor(config: LensConfig) {
    this._authentication = new Authentication(config);
    this.config = config;
  }

  get authentication(): IAuthentication {
    return this._authentication;
  }

  get profile(): Profile {
    return new Profile(this.config);
  }

  get reactions(): Reactions {
    return new Reactions(this.config, this._authentication);
  }

  get search(): Search {
    return new Search(this.config);
  }

  get explore(): Explore {
    return new Explore(this.config);
  }

  get revenue(): Revenue {
    return new Revenue(this.config);
  }

  get publication(): Publication {
    return new Publication(this.config);
  }
}
