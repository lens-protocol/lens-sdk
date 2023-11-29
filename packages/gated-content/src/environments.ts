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
  contractAddress: '0x98a6C31E43b158198da95Ef1242faCA868424187',
};

export const development: EnvironmentConfig = {
  name: 'development',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0xc4F726a10fDEb0E98e16Fa658b606192d57FC71c',
};

export const sandbox: EnvironmentConfig = {
  name: 'sandbox',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0xc4F726a10fDEb0E98e16Fa658b606192d57FC71c', // same as development for now
};
