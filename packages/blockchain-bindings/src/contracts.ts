import { Provider } from '@ethersproject/providers';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { Contract } from 'ethers';

import lensFollowNftAbi from './abi/LensFollowNFT.json';
import lensHubAbi from './abi/LensHub.json';
import lensPeripheryAbi from './abi/LensPeriphery.json';
import erc20Abi from './abi/erc-20.json';
import type { Erc20, LensFollowNFT, LensHub, LensPeriphery } from './types';

export function erc20(address: EthereumAddress, provider: Provider) {
  return new Contract(address, erc20Abi, provider) as Erc20;
}

export function lensFollowNFT(address: EthereumAddress, provider?: Provider) {
  return new Contract(address, lensFollowNftAbi, provider) as LensFollowNFT;
}

export function lensHub(address: EthereumAddress, provider?: Provider) {
  return new Contract(address, lensHubAbi, provider) as LensHub;
}

export function lensPeriphery(address: EthereumAddress, provider?: Provider) {
  return new Contract(address, lensPeripheryAbi, provider) as LensPeriphery;
}
