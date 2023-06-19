import { FallbackProvider } from '@ethersproject/providers';
import { ChainType } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';

export type CreateProviderConfig = {
  chainType: ChainType;
};

export interface IProviderFactory {
  createProvider(
    config: CreateProviderConfig,
  ): Promise<providers.JsonRpcProvider | FallbackProvider>;
}
