import {
  Amount,
  ChainType,
  erc20,
  Erc20Amount,
  fiat,
  FiatAmount,
} from '@lens-protocol/shared-kernel';

import { Amount as ApiAmount, FiatAmount as ApiFiatAmount } from '../graphql/generated';

export function chainType(chainId: number): ChainType {
  switch (chainId) {
    case 1:
    case 5:
      return ChainType.ETHEREUM;
    case 137:
    case 80001:
    case 80002:
      return ChainType.POLYGON;
    default:
      throw new Error(`Not supported chainId: ${chainId}`);
  }
}

/**
 * Convert an Amount returned from the Lens API to an Erc20Amount
 *
 * @param from - Amount returned from the Lens API
 * @returns Erc20Amount instance
 */
export function erc20Amount(from: ApiAmount): Erc20Amount {
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

/**
 * Convert a FiatAmount returned from the Lens API to a FiatAmount
 *
 * @param from - FiatAmount returned from the Lens API
 * @returns FiatAmount instance
 */
export function fiatAmount(from: ApiFiatAmount): FiatAmount {
  const { asset, value } = from;

  const fiatAsset = fiat({
    name: asset.name,
    symbol: asset.symbol,
  });

  return Amount.fiat(fiatAsset, value);
}
