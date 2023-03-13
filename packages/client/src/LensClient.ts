import { Authentication, IAuthentication } from './authentication';
import { LensConfig } from './consts/config';
import { Explore } from './explore';
import { Feed } from './feed';
import { Modules } from './modules';
import { Nfts } from './nfts';
import { Nonces } from './nonces';
import { Notifications } from './notifications';
import { Profile } from './profile';
import { ProxyAction } from './proxy-action';
import { Publication } from './publication';
import { Reactions } from './reactions';
import { Revenue } from './revenue';
import { Search } from './search';
import { Stats } from './stats';
import { Transaction } from './transaction';

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

  get explore(): Explore {
    return new Explore(this.config, this._authentication);
  }

  get feed(): Feed {
    return new Feed(this.config, this._authentication);
  }

  get modules(): Modules {
    return new Modules(this.config, this._authentication);
  }

  get nfts(): Nfts {
    return new Nfts(this.config, this._authentication);
  }

  get nonces(): Nonces {
    return new Nonces(this.config, this._authentication);
  }

  get notifications(): Notifications {
    return new Notifications(this.config, this._authentication);
  }

  get profile(): Profile {
    return new Profile(this.config, this._authentication);
  }

  get proxyAction(): ProxyAction {
    return new ProxyAction(this.config, this._authentication);
  }

  get publication(): Publication {
    return new Publication(this.config, this._authentication);
  }

  get reactions(): Reactions {
    return new Reactions(this.config, this._authentication);
  }

  get revenue(): Revenue {
    return new Revenue(this.config, this._authentication);
  }

  get search(): Search {
    return new Search(this.config, this._authentication);
  }

  get stats(): Stats {
    return new Stats(this.config);
  }

  get transaction(): Transaction {
    return new Transaction(this.config, this._authentication);
  }
}
