import { Provider } from '@ethersproject/providers';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { Contract } from 'ethers';

import erc20Abi from './abi/erc-20.json';
import { Erc20 } from './types/Erc20';

export function erc20(address: EthereumAddress, provider: Provider) {
  return new Contract(address, erc20Abi, provider) as Erc20;
}
