import { CryptoNativeAsset, ChainType, ether, matic } from '@lens-protocol/shared-kernel';

/**
 * A chain configuration
 *
 * @internal
 */
export type ChainConfig = {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: CryptoNativeAsset;
};

/**
 * @internal
 */
export const mainnet: ChainConfig = {
  chainId: 1,
  name: 'Ethereum',
  rpcUrl: 'https://mainnet.infura.io/v3',
  blockExplorer: 'https://etherscan.io/',
  nativeCurrency: ether(),
};

/**
 * @internal
 */
export const goerli: ChainConfig = {
  chainId: 5,
  name: 'Goerli',
  rpcUrl: 'https://goerli.infura.io/v3',
  blockExplorer: 'https://goerli.etherscan.io/',
  nativeCurrency: ether(),
};

/**
 * @internal
 */
export const polygon: ChainConfig = {
  chainId: 137,
  name: 'Polygon Mainnet',
  rpcUrl: 'https://polygon-rpc.com/',
  blockExplorer: 'https://polygonscan.com/',
  nativeCurrency: matic(),
};

/**
 * @internal
 * @deprecated Use `amoy` instead
 */
export const mumbai: ChainConfig = {
  chainId: 80001,
  name: 'Polygon Testnet Mumbai',
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
  blockExplorer: 'https://mumbai.polygonscan.com/',
  nativeCurrency: matic(),
};

/**
 * @internal
 */
export const amoy: ChainConfig = {
  chainId: 80002,
  name: 'Polygon Testnet Amoy',
  rpcUrl: 'https://rpc-amoy.polygon.technology/',
  blockExplorer: 'https://amoy.polygonscan.com/',
  nativeCurrency: matic(),
};

/**
 * A registry of chain configurations
 *
 * @internal
 */
export type ChainConfigRegistry = Record<ChainType, ChainConfig>;
