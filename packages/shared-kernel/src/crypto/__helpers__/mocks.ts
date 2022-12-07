import { utils } from 'ethers';

import { Amount, Denomination } from '../Amount';
import { erc20, Erc20 } from '../Asset';
import { ChainType } from '../ChainType';
import { EthereumAddress } from '../types';

const genRanHex = (size: number) =>
  [...Array<string>(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export function mock32BytesHexString() {
  return '0x' + genRanHex(32 * 2);
}

export function mockUint256HexString() {
  return mock32BytesHexString();
}

export function mockEthereumAddress(): EthereumAddress {
  return utils.getAddress(`0x${genRanHex(20 * 2)}`);
}

export function mockEtherAmount(value: number | string) {
  return Amount.ether(value);
}

export function mockEtherGweiAmount(value: number | string) {
  return Amount.ether(Denomination.gwei(value));
}

export function mockMaticGweiAmount(value: number | string) {
  return Amount.matic(Denomination.gwei(value));
}

export function mockUsdAmount(value: number | string) {
  return Amount.usd(value);
}

export function mockErc20Asset({
  address,
  symbol,
  chainType = ChainType.ETHEREUM,
}: {
  address: string;
  symbol: string;
  chainType?: ChainType;
}): Erc20 {
  return erc20({
    address,
    chainType,
    decimals: 18,
    name: 'An ERC20 token',
    symbol,
  });
}

export function mockDaiAsset({
  chainType = ChainType.ETHEREUM,
}: { chainType?: ChainType } = {}): Erc20 {
  return erc20({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    chainType,
    decimals: 18,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
  });
}

export function mockUsdcAsset({
  chainType = ChainType.ETHEREUM,
}: { chainType?: ChainType } = {}): Erc20 {
  return erc20({
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainType,
    decimals: 6,
    name: 'USD Coin',
    symbol: 'USDC',
  });
}

export function mockDaiAmount(value: number | string, chainType = ChainType.ETHEREUM) {
  return Amount.erc20(mockDaiAsset({ chainType }), value);
}

export function mockUsdcAmount(value: number | string, chainType = ChainType.ETHEREUM) {
  return Amount.erc20(mockUsdcAsset({ chainType }), value);
}

export function mockMaticAmount(value: number | string) {
  return Amount.matic(value);
}
