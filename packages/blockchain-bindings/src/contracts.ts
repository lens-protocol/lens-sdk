import { Provider } from '@ethersproject/providers';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { Contract } from 'ethers';

import erc20Abi from './abi/erc-20.json';
import { IErc20Contract } from './types';

export function erc20(address: EthereumAddress, provider: Provider) {
  return new Contract(address, erc20Abi, provider) as unknown as IErc20Contract & Contract;
}
