import { Signer } from '@ethersproject/abstract-signer';
import { BaseProvider } from '@ethersproject/providers';
import {
  ConnectivityError,
  EnvironmentError,
  InvalidAddressError,
  LensError,
  ProviderError,
  SignerError,
  ValidationError,
} from './error';
import { LitProtocolClient } from './lit/client';
import { LensEnvironment } from './types';
import { validateAddress, validateLensEnvironment } from './validators';

export class LensGatedSDK {
  gated: LitProtocolClient;
  env: LensEnvironment;
  ready: boolean;

  private static _instance: LensGatedSDK;
  private readonly _provider: BaseProvider;
  private readonly _signer: Signer;

  private constructor(config: {
    provider: BaseProvider;
    signer: Signer;
    env: LensEnvironment;
    address: string;
  }) {
    if (!config.provider) {
      throw new ProviderError('Missing ethers JsonRpcProvider');
    }

    if (!config.signer) {
      throw new SignerError();
    }

    if (!config.env || !Object.values(LensEnvironment).includes(config.env)) {
      throw new EnvironmentError(config.env);
    }

    if (!validateAddress(config.address)) {
      throw new InvalidAddressError(config.address);
    }

    this.env = config.env;
    this._provider = config.provider;
    this._signer = config.signer;
    this.ready = false;
    this.gated = new LitProtocolClient({
      provider: this._provider,
      signer: this._signer,
      env: this.env,
      address: config.address,
    });
  }

  /**
   * Handler that should be called every time the connected account changes.
   * @param address The new connected address
   */
  async handleAccountsChanged(address: string) {
    this.gated.address = address;

    // if it was already connected, try to connect again
    if (!this.ready) {
      await this.gated.connect({
        address,
        env: this.env,
      });
    }
  }

  /**
   * Handler that should be called every time the chain id or LensEnvironment
   * changes
   * @param env the new environment
   */
  handleEnvChanged(env: LensEnvironment) {
    this.env = validateLensEnvironment(env);
    this.gated.env = env;
  }

  /**
   * Connects to the LIT network and initializes the client.
   */
  async connect(params: { address: string; env: LensEnvironment }) {
    try {
      this.handleEnvChanged(params.env);
      await this.handleAccountsChanged(params.address);
      this.ready = true;
    } catch (e) {
      await this.disconnect();
      if (e instanceof LensError) throw e;
      throw new ConnectivityError();
    }
  }

  /**
   * Disconnects and deinitializes the client.
   */
  async disconnect() {
    this.ready = false;
    this.gated.disconnect();
  }

  /** Static method that creates an instance of LensGatedSDK. The client should be
   * instantiated using this method only.
   * @param config The config params
   */
  public static async create(config: {
    provider: BaseProvider;
    signer: Signer;
    env: LensEnvironment;
  }): Promise<LensGatedSDK> {
    const address = await config.signer.getAddress();
    LensGatedSDK._instance = new LensGatedSDK({
      provider: config.provider,
      signer: config.signer,
      env: config.env,
      address,
    });

    return LensGatedSDK._instance;
  }

  /**
   * Returns an existing instance of LensGatedSDK if it exists.
   */
  public static async get(): Promise<LensGatedSDK> {
    if (!LensGatedSDK._instance) {
      throw new ValidationError(
        'You need to create a LensGatedSDK instance before getting it. Try calling again with the config param.'
      );
    }

    return LensGatedSDK._instance;
  }
}
