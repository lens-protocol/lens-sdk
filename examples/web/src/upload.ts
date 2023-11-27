import { Readable } from 'stream';

import { Web3Provider } from '@ethersproject/providers';
import { WebIrys } from '@irys/sdk';
import { MediaImageMimeType } from '@lens-protocol/metadata';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import { getWalletClient } from 'wagmi/actions';

import { ILocalFile } from './ILocalFile';
import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

async function getWebIrys() {
  const walletClient = (await getWalletClient()) ?? never('Wallet client not found');

  const webIrys = new WebIrys({
    url: 'https://devnet.irys.xyz',
    token: 'matic',
    wallet: {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      name: 'ethersv5',
      provider: new Web3Provider(walletClient.transport),
    },
  });

  await webIrys.ready();

  const balance = await webIrys.getBalance(walletClient.account.address);

  if (webIrys.utils.fromAtomic(balance).toNumber() < MIN_FUNDS) {
    await webIrys.fund(TOP_UP);
  }

  return webIrys;
}

export async function uploadJson(data: unknown): Promise<string> {
  const confirm = window.confirm(
    `In this example we will now upload metadata file via the Bundlr Network.

Please make sure your wallet is connected to the Polygon Mumbai testnet.

You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
  );

  if (!confirm) {
    throw new Error('User cancelled');
  }

  const bundlr = await getWebIrys();

  const serialized = JSON.stringify(data);
  const tx = await bundlr.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}

export async function uploadImage(file: ILocalFile<MediaImageMimeType>): Promise<string> {
  const confirm = window.confirm(
    `In this example we will now upload metadata file via the Bundlr Network.

Please make sure your wallet is connected to the Polygon Mumbai testnet.

You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
  );

  if (!confirm) {
    throw new Error('User cancelled');
  }

  const bundlr = await getWebIrys();

  const webStream = file.stream();
  const nodeStream = new ReadableWebToNodeStream(webStream);

  const tx = await bundlr.upload(nodeStream as unknown as Readable, {
    tags: [{ name: 'Content-Type', value: file.type }],
  });

  return `https://arweave.net/${tx.id}`;
}
