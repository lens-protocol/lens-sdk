export const LIT_CHAINS = {
  ethereum: {
    contractAddress: '0xA54F7579fFb3F98bd8649fF02813F575f9b3d353',
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    type: 'ERC1155',
    rpcUrls: ['https://eth-mainnet.alchemyapi.io/v2/EuGnkVlzVoEkzdg0lpCarhm8YHOxWVxE'],
    blockExplorerUrls: ['https://etherscan.io'],
    vmType: 'EVM',
  },
  polygon: {
    contractAddress: '0x7C7757a9675f06F3BE4618bB68732c4aB25D2e88',
    chainId: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://explorer.matic.network'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
  mumbai: {
    contractAddress: '0xc716950e5DEae248160109F562e1C9bF8E0CA25B',
    chainId: 80001,
    name: 'Mumbai',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/v1/96bf5fa6e03d272fbd09de48d03927b95633726c'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    type: 'ERC1155',
    vmType: 'EVM',
  },
};

export const ALL_LIT_CHAINS = {
  ...LIT_CHAINS,
};

export const NETWORK_PUB_KEY =
  '9971e835a1fe1a4d78e381eebbe0ddc84fde5119169db816900de796d10187f3c53d65c1202ac083d099a517f34a9b62';

// you can either pass a "chain" param to lit functions, which it uses to tell which network your sig came from.
// or, you can pass a authSig that has and of these keys in it to tell which network your sig came from.
export const LIT_AUTH_SIG_CHAIN_KEYS = ['ethereum'];
