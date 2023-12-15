import { JsonRpcProvider } from '@ethersproject/providers';
import { ChainType, invariant, never } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry } from '../../chains';
import { IProviderFactory } from '../adapters/IProviderFactory';

export type GetProvider = (config: { chainId: number }) => Promise<JsonRpcProvider>;

export interface IProviderBinding {
  getProvider: GetProvider;
}

export class ProviderFactory implements IProviderFactory {
  constructor(
    private readonly bindings: IProviderBinding,
    private readonly chains: ChainConfigRegistry,
  ) {}

  async createProvider(config: { chainType: ChainType }): Promise<JsonRpcProvider> {
    const chainId = this.chains[config.chainType]?.chainId ?? never('Unable to determine chainId');
    const provider = await this.bindings.getProvider({ chainId });

    const network = await provider.getNetwork();

    invariant(
      network.chainId === chainId,
      `Invalid chainId. Expected ${chainId} but got ${network.chainId}`,
    );

    return provider;
  }
}
