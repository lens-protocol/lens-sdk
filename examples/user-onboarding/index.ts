import 'viem/window';

import { chains } from '@lens-network/sdk/viem';
import { PublicClient, testnet as protocolTestnet } from '@lens-protocol/client';
import { createAccountWithUsername, fetchAccount } from '@lens-protocol/client/actions';
import { handleOperationWith } from '@lens-protocol/client/viem';
import { account } from '@lens-protocol/metadata';
import { StorageClient, testnet as storageTestnet } from '@lens-protocol/storage-node-client';
import { type Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [address] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const walletClient = createWalletClient({
  account: address,
  chain,
  transport: custom(window.ethereum!),
});

const client = PublicClient.create({
  environment: protocolTestnet,
});

const sessionClient = await client
  .login({
    onboardingUser: {
      wallet: walletClient.account.address,
      app: '0xe5439696f4057aF073c0FB2dc6e5e755392922e1',
    },
    signMessage: async (message) => walletClient.signMessage({ message }),
  })
  .match(
    (result) => result,
    (error) => {
      throw error;
    },
  );

const storageClient = StorageClient.create(storageTestnet);

const metadata = account({
  name: 'John Doe',
});

const { uri } = await storageClient.uploadFile(
  new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' }),
);

const created = await createAccountWithUsername(sessionClient, {
  metadataUri: uri,
  username: {
    localName: `john.doe.${Date.now()}`,
  },
})
  .andThen(handleOperationWith(walletClient))
  .andThen(sessionClient.waitForTransaction)
  .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
  .match(
    (result) => result,
    (error) => {
      throw error;
    },
  );

export default [
  `<h2>${created?.username?.value}</h2>`,
  `<p>Address: ${await created?.address}</p>`,
];
