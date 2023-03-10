import { EthereumAddress } from '@lens-protocol/shared-kernel';
import type { Chain } from '@lit-protocol/constants';

export type EnvironmentConfig = {
  chainId: number;
  chainName: Chain;
  contractAddress: EthereumAddress;
};

export const production: EnvironmentConfig = {
  chainId: 137,
  chainName: 'polygon',
  contractAddress: '0xE1A4f40b74f6E91159ffBd95489FE74Efe71fD97',
};

export const staging: EnvironmentConfig = {
  chainId: 80001,
  chainName: 'mumbai',
  contractAddress: '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF',
};
