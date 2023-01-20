import { CryptoAmount } from '@lens-protocol/shared-kernel';
import { utils } from 'ethers';

export function bigNumber(from: CryptoAmount) {
  return utils.parseUnits(from.toFixed(), from.asset.decimals);
}
