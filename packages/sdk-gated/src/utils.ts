import { ChainIdError, UnsupportedNetworkError } from './error';
import { SupportedChains } from './lit/types';
import { LensEnvironment } from './types';

export const chainIdToString = (chainId: number): SupportedChains => {
  switch (chainId) {
    case 1:
      return SupportedChains.ETHEREUM;
    case 137:
      return SupportedChains.POLYGON;
    case 80001:
      return SupportedChains.MUMBAI;
    default:
      throw new ChainIdError(chainId);
  }
};

export const envToChainId = (network: LensEnvironment): number => {
  switch (network) {
    case LensEnvironment.Polygon:
      return 137;
    case LensEnvironment.Mumbai:
    case LensEnvironment.MumbaiSandbox:
      return 80001;
    default:
      throw new UnsupportedNetworkError(network);
  }
};

export const isBrowser =
  typeof globalThis.window !== 'undefined' && typeof globalThis.window.document !== 'undefined';

export const isNode = !isBrowser;
