import { Provider } from '@ethersproject/providers';
import { EvmAddress } from '@lens-protocol/shared-kernel';
import { Contract } from 'ethers';

import lensFollowNftAbi from './abi/LensFollowNFT.json';
import lensHubAbi from './abi/LensHub.json';
import lensTokenHandleRegistryAbi from './abi/LensTokenHandleRegistry.json';
import publicActProxyAbi from './abi/PublicActProxy.json';
import erc20Abi from './abi/erc-20.json';
import type {
  Erc20,
  LensFollowNFT,
  LensHub,
  LensTokenHandleRegistry,
  PublicActProxy,
} from './types';

export function erc20(address: EvmAddress, provider: Provider) {
  return new Contract(address, erc20Abi, provider) as Erc20;
}

export function lensFollowNFT(address: EvmAddress, provider?: Provider) {
  return new Contract(address, lensFollowNftAbi, provider) as LensFollowNFT;
}

export function lensHub(address: EvmAddress, provider?: Provider) {
  return new Contract(address, lensHubAbi, provider) as LensHub;
}

export function lensTokenHandleRegistry(address: EvmAddress, provider?: Provider) {
  return new Contract(address, lensTokenHandleRegistryAbi, provider) as LensTokenHandleRegistry;
}

export function publicActProxy(address: EvmAddress, provider?: Provider) {
  return new Contract(address, publicActProxyAbi, provider) as PublicActProxy;
}
