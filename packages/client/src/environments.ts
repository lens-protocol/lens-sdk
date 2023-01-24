import { ChainType } from '@lens-protocol/shared-kernel';

import { ChainConfigRegistry, goerli, mainnet, mumbai, polygon } from './chains';

export type EnvironmentConfig = {
  backend: string;
  chains: ChainConfigRegistry;
};

export const production: EnvironmentConfig = {
  backend: 'https://api.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: mainnet,
    [ChainType.POLYGON]: polygon,
  },
};

export const staging: EnvironmentConfig = {
  backend: 'https://api-mumbai.lens.dev',
  chains: {
    [ChainType.ETHEREUM]: goerli,
    [ChainType.POLYGON]: mumbai,
  },
};
