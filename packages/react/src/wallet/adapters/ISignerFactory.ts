import { WalletConnectionError, WalletType } from '@lens-protocol/domain';
import { ChainType, EthereumAddress, PromiseResult } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';

export type CreateSignerConfig = {
  walletType: WalletType;
  chainType?: ChainType;
  walletAddress?: EthereumAddress;
};

export interface ISignerFactory {
  createSigner(
    config: CreateSignerConfig,
  ): PromiseResult<providers.JsonRpcSigner, WalletConnectionError>;
}
