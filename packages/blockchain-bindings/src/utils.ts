import { parseUnits } from '@ethersproject/units';
import { CryptoAmount, EvmAddress } from '@lens-protocol/shared-kernel';

export function hexToInt(hex: string): number {
  return parseInt(hex, 16);
}

export function isTheSameAddress(address1: EvmAddress, address2: EvmAddress) {
  // lowercase before comparing to avoid comparing checksum address with a normal one
  return address1.toLowerCase() === address2.toLowerCase();
}

export function bigNumber(from: CryptoAmount) {
  return parseUnits(from.toFixed(), from.asset.decimals);
}
