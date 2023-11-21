import { Amount, ChainType, erc20, Erc20Amount } from '@lens-protocol/shared-kernel';

import { Amount as ApiAmount } from '../graphql/generated';

export function chainType(chainId: number): ChainType {
  switch (chainId) {
    case 1:
    case 5:
      return ChainType.ETHEREUM;
    case 137:
    case 80001:
      return ChainType.POLYGON;
    default:
      throw new Error(`Not supported chainId: ${chainId}`);
  }
}

export function erc20Amount({ from }: { from: ApiAmount }): Erc20Amount {
  const { asset, value } = from;

  const erc20Asset = erc20({
    name: asset.name,
    decimals: asset.decimals,
    symbol: asset.symbol,
    address: asset.contract.address,
    chainType: chainType(asset.contract.chainId),
  });
  return Amount.erc20(erc20Asset, value);
}
