import { Amount, ChainType, Erc20, erc20 } from '@lens-protocol/shared-kernel';

import { Erc20Fragment, ModuleFeeAmountParams } from '../generated';

export function erc20Amount({ from }: { from: { asset: Erc20Fragment; value: string } }) {
  const asset = erc20({ chainType: ChainType.POLYGON, ...from.asset });
  return Amount.erc20(asset, from.value);
}

export function moduleFeeAmountParams({ from }: { from: Amount<Erc20> }): ModuleFeeAmountParams {
  return {
    currency: from.asset.address,
    value: from.toFixed(),
  };
}
