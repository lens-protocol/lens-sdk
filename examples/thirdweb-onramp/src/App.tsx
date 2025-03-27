import 'viem/window';
import { chains } from '@lens-chain/sdk/viem';
import { createThirdwebClient } from 'thirdweb';
import { viemAdapter } from 'thirdweb/adapters/viem';
import { ethereum } from 'thirdweb/chains';
import { PayEmbed } from 'thirdweb/react';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

// create wallet client
// this example assume you might not use thirdweb wallet already, if you
// do you can skip this step and use the wallet from thirdweb
const walletClient = createWalletClient({
  account: address,
  chain: chain,
  transport: custom(window.ethereum!),
});

// create thirdweb wallet
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
        mode: 'direct_payment',
        buyWithFiat: {
          preferredProvider: 'COINBASE',
          testMode: true, // <<<<<<<<< IMPORTANT!!! enable test mode
        },
        buyWithCrypto: false,
        paymentInfo: {
          amount: '5', // amount of token to buy
          chain: ethereum, // workaround for getting quotes working
          sellerAddress: address,
          token: {
            // Using GHO on Ethereum to get quotes working
            address: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f',

            // Making it look like GRASS token
            name: 'GRASS',
            symbol: 'GRASS',
            icon: 'https://block-explorer.testnet.lens.dev/images/grass.png',
          },
        },
        onPurchaseSuccess: (purchase) => {
          console.log('Purchase success', purchase);
        },
      }}
    />
  );
}
