import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { SupportedChains } from './conditions/types';

export type EnvironmentConfig = {
  name: 'production' | 'development' | 'sandbox' | string;
  chainId: number;
  chainName: SupportedChains | string;
  contractAddress: EthereumAddress;
};

export const production: EnvironmentConfig = {
  name: 'production',
  chainId: 137,
  chainName: SupportedChains.POLYGON,
  contractAddress: '0xE1A4f40b74f6E91159ffBd95489FE74Efe71fD97',
};

export const development: EnvironmentConfig = {
  name: 'development',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF',
};

export const sandbox: EnvironmentConfig = {
  name: 'sandbox',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
};
