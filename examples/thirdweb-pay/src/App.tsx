import 'viem/window';
import { chains } from '@lens-network/sdk/viem';
import { createThirdwebClient } from 'thirdweb';
import { viemAdapter } from 'thirdweb/adapters/viem';
import { ethereum } from 'thirdweb/chains';
import { PayEmbed } from 'thirdweb/react';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const walletClient = createWalletClient({
  account: address,
  chain: chain,
  transport: custom(window.ethereum!),
});

const thirdwebWallet = await viemAdapter.wallet.fromViem({
  walletClient: walletClient,
});

const client = createThirdwebClient({ clientId: '44323e7868feac3bd3ea4d91c9e879d4' });

await thirdwebWallet.connect({ client });

export function App() {
  return (
    <PayEmbed
      activeWallet={thirdwebWallet}
      client={client}
      payOptions={{
        buyWithFiat: {
          preferredProvider: 'COINBASE',
          testMode: true, // enable test mode
        },
        buyWithCrypto: false,
        prefillBuy: {
          token: {
            // Using GHO on Ethereum to get quotes working
            address: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f',

            // Making it look like GRASS token
            name: 'GRASS',
            symbol: 'GRASS',
            icon: 'https://block-explorer.testnet.lens.dev/images/grass.png',
          },
          chain: ethereum, // workaround for getting quotes working
          allowEdits: {
            amount: true, // allow editing buy amount
            token: false, // disable selecting buy token
            chain: false, // disable selecting buy chain
          },
        },
        onPurchaseSuccess: (purchase) => {
          console.log('Purchase success', purchase);
        },
      }}
    />
  );
}
