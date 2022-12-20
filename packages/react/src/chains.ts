import { CryptoNativeAsset, ChainType, ether, matic } from '@lens-protocol/shared-kernel';

export type ChainConfig = {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: CryptoNativeAsset;
};

export const mainnet: ChainConfig = {
  chainId: 1,
  name: 'Ethereum',
  rpcUrl: 'https://mainnet.infura.io/v3',
  blockExplorer: 'https://etherscan.io/',
  nativeCurrency: ether(),
};

export const goerli: ChainConfig = {
  chainId: 5,
  name: 'Goerli',
  rpcUrl: 'https://goerli.infura.io/v3',
  blockExplorer: 'https://goerli.etherscan.io/',
  nativeCurrency: ether(),
};

export const polygon: ChainConfig = {
  chainId: 137,
  name: 'Polygon Mainnet',
  rpcUrl: 'https://polygon-rpc.com/',
  blockExplorer: 'https://polygonscan.com/',
  nativeCurrency: matic(),
};

export const mumbai: ChainConfig = {
  chainId: 80001,
  name: 'Polygon Testnet Mumbai',
  rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
  blockExplorer: 'https://mumbai.polygonscan.com/',
  nativeCurrency: matic(),
};

export type ChainConfigRegistry = Record<ChainType, ChainConfig>;
