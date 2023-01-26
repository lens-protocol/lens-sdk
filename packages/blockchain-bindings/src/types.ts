import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { BigNumber, CallOverrides, PopulatedTransaction } from 'ethers';
export type ChainId = number;

// https://eips.ethereum.org/EIPS/eip-3085
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

interface IErc20Methods<T> {
  approve(spender: EthereumAddress, amount: BigNumber, overrides?: CallOverrides): Promise<T>;
  allowance(
    owner: EthereumAddress,
    spender: EthereumAddress,
    overrides?: CallOverrides,
  ): Promise<T>;
  balanceOf(owner: EthereumAddress, overrides?: CallOverrides): Promise<T>;
}

export interface IErc20Contract extends IErc20Methods<BigNumber> {
  estimateGas: IErc20Methods<BigNumber>;
  populateTransaction: IErc20Methods<PopulatedTransaction>;
}
