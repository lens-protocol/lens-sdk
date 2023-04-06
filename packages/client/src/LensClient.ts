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

/**
 * The LensClient is the main entry point for the LensClient SDK.
 * It provides access to all the different modules.
 *
 * @group LensClient
 *
 * @example
 * ```ts
 * import { LensClient, development } from '@lens-protocol/client';
 *
 * const client = new LensClient({
 *   environment: development
 * });
 * ```
 */
export class LensClient {
  private readonly _authentication: Authentication;
  private readonly config: LensConfig;

  /**
   * @param config - The configuration for the LensClient
   */
  constructor(config: LensConfig) {
    this._authentication = new Authentication(config);
    this.config = config;
  }

  get authentication(): IAuthentication {
    return this._authentication;
  }

  /**
   * The Explore module
   */
  get explore(): Explore {
    return new Explore(this.config, this._authentication);
  }

  /**
   * The Feed module
   */
  get feed(): Feed {
    return new Feed(this.config, this._authentication);
  }

  /**
   * The Modules module
   */
  get modules(): Modules {
    return new Modules(this.config, this._authentication);
  }

  /**
   * The Nfts module
   */
  get nfts(): Nfts {
    return new Nfts(this.config, this._authentication);
  }

  /**
   * The Nonces module
   */
  get nonces(): Nonces {
    return new Nonces(this.config, this._authentication);
  }

  /**
   * The Notifications module
   */
  get notifications(): Notifications {
    return new Notifications(this.config, this._authentication);
  }

  /**
   * The Profile module
   */
  get profile(): Profile {
    return new Profile(this.config, this._authentication);
  }

  /**
   * The ProxyAction module
   */
  get proxyAction(): ProxyAction {
    return new ProxyAction(this.config, this._authentication);
  }

  /**
   * The Publication module
   */
  get publication(): Publication {
    return new Publication(this.config, this._authentication);
  }

  /**
   * The Reactions module
   */
  get reactions(): Reactions {
    return new Reactions(this.config, this._authentication);
  }

  /**
   * The Revenue module
   */
  get revenue(): Revenue {
    return new Revenue(this.config, this._authentication);
  }

  /**
   * The Search module
   */
  get search(): Search {
    return new Search(this.config, this._authentication);
  }

  /**
   * The Stats module
   */
  get stats(): Stats {
    return new Stats(this.config);
  }

  /**
   * The Transaction module
   */
  get transaction(): Transaction {
    return new Transaction(this.config, this._authentication);
  }
}
