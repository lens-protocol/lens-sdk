import { ChainType, invariant } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';

import { ChainConfigRegistry } from '../../chains';
import { IProviderFactory } from '../adapters/IProviderFactory';

export type GetProvider = (config: { chainId: number }) => Promise<providers.JsonRpcProvider>;

export interface IProviderBinding {
  getProvider: GetProvider;
}

export class ProviderFactory implements IProviderFactory {
  constructor(
    private readonly bindings: IProviderBinding,
    private readonly chains: ChainConfigRegistry,
  ) {}

  async createProvider(config: { chainType: ChainType }): Promise<providers.JsonRpcProvider> {
    const chainId = this.chains[config.chainType].chainId;
    const provider = await this.bindings.getProvider({ chainId });

    const network = await provider.getNetwork();

    invariant(
      network.chainId === chainId,
      `Invalid chainId. Expected ${chainId} but got ${network.chainId}`,
    );

    return provider;
  }
}
