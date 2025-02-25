import { createThirdwebClient } from 'thirdweb';
import { ethereum, sepolia } from 'thirdweb/chains';
import { PayEmbed } from 'thirdweb/react';

// // hoist account
// const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

// const walletClient = createWalletClient({
//   account: address,
//   chain,
//   transport: custom(window.ethereum!),
// });

const client = createThirdwebClient({ clientId: '44323e7868feac3bd3ea4d91c9e879d4' });

export function App() {
  return (
    <PayEmbed
      client={client}
      payOptions={{
        buyWithFiat: { preferredProvider: 'COINBASE', testMode: true },
        buyWithCrypto: false,
        prefillBuy: {
          token: {
            // Using GHO on Ethereum to get quotes working
            address: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f', // GHO on Ethereum
            // address: '0x2Be68B15c693D3b5747F9F0D49D30A2E81BAA2Df', // GRASS on Sepolia

            // Making it look like GRASS token
            name: 'GRASS',
            symbol: 'GRASS',
            icon: 'https://block-explorer.testnet.lens.dev/images/grass.png',
          },
          chain: ethereum,
          allowEdits: {
            amount: true, // allow editing buy amount
            token: false, // disable selecting buy token
            chain: false, // disable selecting buy chain
          },
        },
      }}
    />
  );
}
