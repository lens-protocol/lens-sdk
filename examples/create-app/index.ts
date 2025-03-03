import 'viem/window';

import { StorageClient, immutable } from '@lens-chain/storage-client';
import { chains } from '@lens-network/sdk/viem';
import { PublicClient, testnet, uri } from '@lens-protocol/client';
import { createApp, fetchApp } from '@lens-protocol/client/actions';
import { handleOperationWith } from '@lens-protocol/client/viem';
import { Platform, app } from '@lens-protocol/metadata';
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
  environment: testnet,
});

const sessionClient = await client
  .login({
    builder: {
      address: walletClient.account.address,
    },
    signMessage: async (message) => walletClient.signMessage({ message }),
  })
  .match(
    (result) => result,
    (error) => {
      throw error;
    },
  );

const storageClient = StorageClient.create();

const metadata = app({
  name: 'My App',
  url: 'https://example.com',
  description: 'My app description',
  platforms: [Platform.WEB],
  developer: 'me@example.com',
});

const resource = await storageClient.uploadAsJson(metadata, { acl: immutable(chain.id) });

const created = await createApp(sessionClient, {
  metadataUri: uri(resource.uri),
  defaultFeed: {
    globalFeed: true,
  },
  graph: {
    globalGraph: true,
  },
  namespace: {
    globalNamespace: true,
  },
})
  .andThen(handleOperationWith(walletClient))
  .andThen(sessionClient.waitForTransaction)
  .andThen((txHash) => fetchApp(sessionClient, { txHash }))
  .match(
    (result) => result,
    (error) => {
      throw error;
    },
  );

export default [`<h2>${created?.metadata?.name}</h2>`, `<p>Address: ${await created?.address}</p>`];
