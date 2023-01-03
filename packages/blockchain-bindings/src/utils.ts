import { ChainType, EthereumAddress } from '@lens-protocol/shared-kernel';

import { ChainId } from './types';

export function createRpcMap(
  chainIds: Record<ChainType, ChainId>,
  rpcUrls: Record<ChainType, string>,
): Record<ChainId, string> {
  const rpcMap: Record<ChainId, string> = {};

  for (const [chainType, chainId] of Object.entries(chainIds)) {
    rpcMap[chainId] = rpcUrls[chainType as keyof typeof chainIds];
  }

  return rpcMap;
}

export function hexToInt(hex: string): number {
  return parseInt(hex, 16);
}

export function isTheSameAddress(address1: EthereumAddress, address2: EthereumAddress) {
  // lowercase before comparing to avoid comparing checksum address with a normal one
  return address1.toLowerCase() === address2.toLowerCase();
}
