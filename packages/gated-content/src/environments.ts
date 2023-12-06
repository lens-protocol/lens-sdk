import { AccessControlContract, SupportedChainId, SupportedChains } from './conditions';

export { SupportedChains };

export type EnvironmentConfig = {
  name: string;
  chainId: number;
  chainName: SupportedChains | string;
  accessControlContract: AccessControlContract;
  patches?: {
    accessControlContract: AccessControlContract;
  };
};

export const production: EnvironmentConfig = {
  name: 'production',
  chainId: 137,
  chainName: SupportedChains.POLYGON,
  accessControlContract: {
    address: '0xE1A4f40b74f6E91159ffBd95489FE74Efe71fD97',
    chainId: SupportedChainId.POLYGON,
  },
  patches: {
    accessControlContract: {
      address: '0x98a6C31E43b158198da95Ef1242faCA868424187',
      chainId: SupportedChainId.POLYGON,
    },
  },
};

export const development: EnvironmentConfig = {
  name: 'development',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  accessControlContract: {
    address: '0xc4F726a10fDEb0E98e16Fa658b606192d57FC71c',
    chainId: SupportedChainId.MUMBAI,
  },
};
