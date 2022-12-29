import { Provider } from '@ethersproject/providers';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { BigNumber, CallOverrides, Contract, PopulatedTransaction } from 'ethers';

import erc20Abi from './abi/erc-20.json';

interface IErc20Methods<T> {
  approve(spender: EthereumAddress, amount: BigNumber, overrides?: CallOverrides): Promise<T>;
  allowance(
    owner: EthereumAddress,
    spender: EthereumAddress,
    overrides?: CallOverrides,
  ): Promise<T>;
  balanceOf(owner: EthereumAddress, overrides?: CallOverrides): Promise<T>;
}

interface IErc20Contract extends IErc20Methods<BigNumber> {
  estimateGas: IErc20Methods<BigNumber>;
  populateTransaction: IErc20Methods<PopulatedTransaction>;
}

export function erc20(address: EthereumAddress, provider: Provider) {
  return new Contract(address, erc20Abi, provider) as unknown as IErc20Contract & Contract;
}
