import { Amount, ChainType, Erc20, erc20 } from '@lens-protocol/shared-kernel';

import { Erc20Fragment, ModuleFeeAmountParams } from '../generated';

export function erc20Amount({ from }: { from: { __asset: Erc20Fragment; __value: string } }) {
  const asset = erc20({ chainType: ChainType.POLYGON, ...from.__asset });
  return Amount.erc20(asset, from.__value);
}

export function moduleFeeAmountParams({ from }: { from: Amount<Erc20> }): ModuleFeeAmountParams {
  return {
    currency: from.asset.address,
    value: from.toFixed(),
  };
}
