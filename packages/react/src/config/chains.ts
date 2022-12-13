export type ChainConfig = {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
};

export const polygon: ChainConfig = {
  chainId: 137,
  name: 'Polygon Mainnet',
  rpcUrl: 'https://polygon-rpc.com/',
  blockExplorer: 'https://polygonscan.com/',
};

export const mumbai: ChainConfig = {
  chainId: 80001,
  name: 'Polygon Testnet Mumbai',
  rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
  blockExplorer: 'https://mumbai.polygonscan.com/',
};
