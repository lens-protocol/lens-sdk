import { EvmAddress } from '@lens-protocol/shared-kernel';

import { SupportedChains } from './conditions/types';

export { SupportedChains };

export type EnvironmentConfig = {
  name: string;
  chainId: number;
  chainName: SupportedChains | string;
  contractAddress: EvmAddress;
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
  contractAddress: '0x88a01ae97ab6ccbc8093511b466acd0edc1c30f1',
};

export const sandbox: EnvironmentConfig = {
  name: 'sandbox',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0x88a01ae97ab6ccbc8093511b466acd0edc1c30f1', // same as development for now
};
