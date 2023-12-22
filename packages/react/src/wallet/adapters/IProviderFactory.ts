import { JsonRpcProvider } from '@ethersproject/providers';
import { ChainType } from '@lens-protocol/shared-kernel';

export type CreateProviderConfig = {
  chainType: ChainType;
};

export interface IProviderFactory {
  createProvider(config: CreateProviderConfig): Promise<JsonRpcProvider>;
}
