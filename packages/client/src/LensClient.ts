import { InMemoryStorageProvider, IStorageProvider } from '@lens-protocol/storage';
import { TypedQueryDocumentNode } from 'graphql';

import { Authentication, IAuthentication } from './authentication';
import { LensContext, MediaTransformsConfig } from './context';
import { Environment } from './environments';
import {
  Explore,
  Feed,
  Invites,
  Modules,
  Momoka,
  Nfts,
  Notifications,
  Poaps,
  Profile,
  Publication,
  Revenue,
  Search,
  Transaction,
  Wallet,
} from './submodules';

/**
 * LensClient configuration
 */
export type LensClientConfig = {
  /**
   * The environment to use. See {@link production}, {@link development}, and {@link sandbox}.
   */
  environment: Environment;
  /**
   * The storage provider to use.
   *
   * @defaultValue {@link InMemoryStorageProvider}
   */
  storage?: IStorageProvider;

  /**
   * Media returned from the publication and profile queries can be transformed
   * to sizes needed by the SDK consuming application.
   * To overwrite default transformation values, provide a `mediaTransforms` object.
   *
   * @see {@link MediaTransformsConfig} for more information
   */
  mediaTransforms?: MediaTransformsConfig;

  /**
   * The app ids to use to read data from the Lens Protocol.
   * If not provided, all apps will be used.
   */
  forApps?: string[];

  profileFragment: TypedQueryDocumentNode;
};

/**
 * The LensClient is the main entry point for the LensClient SDK.
 *
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
  protected readonly context: LensContext;
  protected readonly _authentication: Authentication;

  /**
   * @param config - The configuration for the LensClient
   */
  constructor(public readonly config: LensClientConfig) {
    this.context = {
      environment: config.environment,
      storage: config.storage || new InMemoryStorageProvider(),
      mediaTransforms: config.mediaTransforms || {},
      forApps: config.forApps || [],
    };
    this._authentication = new Authentication(this.context);
  }

  /**
   * The authentication module
   */
  get authentication(): IAuthentication {
    return this._authentication;
  }

  /**
   * The Explore module
   */
  get explore(): Explore {
    return new Explore(this.context, this._authentication);
  }

  /**
   * The Feed module
   */
  get feed(): Feed {
    return new Feed(this.context, this._authentication);
  }

  /**
   * The Invites module
   */
  get invites(): Invites {
    return new Invites(this.context, this._authentication);
  }

  /**
   * The Modules module
   */
  get modules(): Modules {
    return new Modules(this.context, this._authentication);
  }

  /**
   * The Momoka module
   */
  get momoka(): Momoka {
    return new Momoka(this.context, this._authentication);
  }

  /**
   * The Nfts module
   */
  get nfts(): Nfts {
    return new Nfts(this.context, this._authentication);
  }

  /**
   * The Notifications module
   */
  get notifications(): Notifications {
    return new Notifications(this.context, this._authentication);
  }

  /**
   * The Poaps module
   */
  get poaps(): Poaps {
    return new Poaps(this.context, this._authentication);
  }

  /**
   * The Profile module
   */
  get profile(): Profile {
    return new Profile(this.context, this._authentication);
  }

  /**
   * The Publication module
   */
  get publication(): Publication {
    return new Publication(this.context, this._authentication);
  }

  /**
   * The Revenue module
   */
  get revenue(): Revenue {
    return new Revenue(this.context, this._authentication);
  }

  /**
   * The Search module
   */
  get search(): Search {
    return new Search(this.context, this._authentication);
  }

  /**
   * The Transaction module
   */
  get transaction(): Transaction {
    return new Transaction(this.context, this._authentication);
  }

  /**
   * The Wallet module
   */
  get wallet(): Wallet {
    return new Wallet(this.context, this._authentication);
  }
}
