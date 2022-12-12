import { ChainType } from '@lens-protocol/shared-kernel';
import { ChainConfig, mumbai, polygon } from './chains';

export type EnvironmentConfig = {
  gqlEndpoint: string;
  chains: Record<ChainType.POLYGON, ChainConfig>;
};

export const production: EnvironmentConfig = {
  gqlEndpoint: 'https://api.lens.dev',
  chains: {
    [ChainType.POLYGON]: polygon,
  },
};

export const staging: EnvironmentConfig = {
  gqlEndpoint: 'https://api-mumbai.lens.dev',
  chains: {
    [ChainType.POLYGON]: mumbai,
  },
};
