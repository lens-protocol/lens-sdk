import { hexValue } from '@ethersproject/bytes';
import { ErrorCode } from '@ethersproject/logger';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AddEthereumChainParameter, isTheSameAddress } from '@lens-protocol/blockchain-bindings';
import { WalletConnectionError, WalletConnectionErrorReason } from '@lens-protocol/domain/entities';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry } from '../../chains';
import { CreateSignerConfig, ISignerFactory, RequiredSigner } from '../adapters/ConcreteWallet';
import { assertErrorObjectWithCode } from '../adapters/errors';

export type GetSigner = (config: { chainId?: number }) => Promise<RequiredSigner>;

export interface ISignerBinding {
  getSigner: GetSigner;
}

export type SignerFactoryConfig = {
  getSigner: GetSigner;
  chains: ChainConfigRegistry;
};

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
      try {
        const signerChainId = await signer.getChainId();
        if (signerChainId !== chainId) {
          const chainConfig = this.createAddEthereumChainParameter(chainType);

          await this.addChain(signer, chainConfig);

          const result = await this.switchChain(signer, chainConfig);

          if (result.isFailure()) {
            return result;
          }
        }
      } catch (err) {
        assertErrorObjectWithCode<ErrorCode>(err);

        if (err.code === ErrorCode.UNSUPPORTED_OPERATION) {
          return failure(new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN));
        }
      }
    }
    return success(signer);
  }

  private createAddEthereumChainParameter(chainType: ChainType): AddEthereumChainParameter {
    const chainConfig = this.chains[chainType];
    return {
      chainId: hexValue(chainConfig.chainId),
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
      if (signer.provider && signer.provider instanceof JsonRpcProvider) {
        await signer.provider.send('wallet_addEthereumChain', [chainConfig]);
      }
    } catch {
      // noop
    }
  }

  private async switchChain(
    signer: RequiredSigner,
    chainConfig: AddEthereumChainParameter,
  ): PromiseResult<void, WalletConnectionError> {
    try {
      if (signer.provider && signer.provider instanceof JsonRpcProvider) {
        await signer.provider.send('wallet_switchEthereumChain', [
          { chainId: hexValue(chainConfig.chainId) },
        ]);

        return success();
      }
    } catch {
      // noop
    }

    return failure(new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN));
  }
}
