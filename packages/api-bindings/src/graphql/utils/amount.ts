import { Amount, ChainType, Erc20, erc20, Erc20Amount } from '@lens-protocol/shared-kernel';

import { Erc20AmountFields, ModuleFeeAmount, ModuleFeeAmountParams } from '../generated';

export function erc20Amount({ from }: { from: Erc20AmountFields | ModuleFeeAmount }): Erc20Amount {
  const asset = erc20({ chainType: ChainType.POLYGON, ...from.asset });
  return Amount.erc20(asset, from.value);
}

export function moduleFeeAmountParams({ from }: { from: Amount<Erc20> }): ModuleFeeAmountParams {
  return {
    currency: from.asset.address,
    value: from.toFixed(),
  };
}
