import { AddEthereumChainParameter } from '@lens-protocol/blockchain-bindings';
import { WalletConnectionError, WalletConnectionErrorReason } from '@lens-protocol/domain/entities';
import {
  ChainType,
  EthereumAddress,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { utils } from 'ethers';

import { ChainConfigRegistry } from '../../chains';
import { CreateSignerConfig, ISignerFactory, RequiredSigner } from '../adapters/ConcreteWallet';

export type GetSigner = (config: { chainId?: number }) => Promise<RequiredSigner>;

export interface ISignerBinding {
  getSigner: GetSigner;
}

export type SignerFactoryConfig = {
  getSigner: GetSigner;
  chains: ChainConfigRegistry;
};

function isTheSameAddress(address1: EthereumAddress, address2: EthereumAddress) {
  // lowercase before comparing to avoid comparing checksum address with a normal one
  return address1.toLowerCase() === address2.toLowerCase();
}

export class SignerFactory implements ISignerFactory {
  constructor(
    private readonly bindings: ISignerBinding,
    private readonly chains: ChainConfigRegistry,
  ) {}

  async createSigner({
    address,
    chainType,
  }: CreateSignerConfig): PromiseResult<RequiredSigner, WalletConnectionError> {
    const chainId = chainType ? this.chains[chainType].chainId : undefined;
    const signer = await this.bindings.getSigner({ chainId });

    const signerAddress = await signer.getAddress();

    if (!isTheSameAddress(address, signerAddress)) {
      return failure(new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT));
    }

    if (chainType) {
      const signerChainId = await signer.getChainId();
      if (signerChainId !== chainId) {
        const chainConfig = this.createAddEthereumChainParameter(chainType);

        await this.addChain(signer, chainConfig);

        const result = await this.switchChain(signer, chainConfig);

        if (result.isFailure()) {
          return failure(result.error);
        }
      }
    }
    return success(signer);
  }

  private createAddEthereumChainParameter(chainType: ChainType): AddEthereumChainParameter {
    const chainConfig = this.chains[chainType];
    return {
      chainId: utils.hexValue(chainConfig.chainId),
      chainName: chainConfig.name,
      nativeCurrency: {
        name: chainConfig.nativeCurrency.name,
        symbol: chainConfig.nativeCurrency.symbol,
        decimals: chainConfig.nativeCurrency.decimals,
      },
      rpcUrls: [chainConfig.rpcUrl],
      blockExplorerUrls: [chainConfig.blockExplorer],
    };
  }

  private async addChain(signer: RequiredSigner, chainConfig: AddEthereumChainParameter) {
    try {
      await signer.provider.send('wallet_addEthereumChain', [chainConfig]);
    } catch {
      // noop
    }
  }

  private async switchChain(
    signer: RequiredSigner,
    chainConfig: AddEthereumChainParameter,
  ): PromiseResult<void, WalletConnectionError> {
    try {
      await signer.provider.send('wallet_switchEthereumChain', [{ chainId: chainConfig.chainId }]);

      return success();
    } catch {
      return failure(new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN));
    }
  }
}
