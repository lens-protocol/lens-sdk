import { Readable } from 'stream';

import { WebBundlr } from '@bundlr-network/client';
import { ImageType } from '@lens-protocol/react-web';
import { providers, utils } from 'ethers';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import { fetchSigner } from 'wagmi/actions';

import { ILocalFile } from './hooks/useFileSelect';
import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

async function getBundlr() {
  const signer = (await fetchSigner()) ?? never('Cannot get signer');
  const provider = signer?.provider ?? never('Cannot get provider');

  if (provider instanceof providers.JsonRpcProvider) {
    await provider.send('wallet_switchEthereumChain', [{ chainId: utils.hexValue(80001) }]);
  }

  const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', signer?.provider, {
    providerUrl: 'https://rpc-mumbai.maticvigil.com/',
  });

  await bundlr.ready();

  const balance = await bundlr.getBalance((await signer?.getAddress()) ?? never());

  if (bundlr.utils.unitConverter(balance).toNumber() < MIN_FUNDS) {
    await bundlr.fund(TOP_UP);
  }

  return bundlr;
}

export async function upload(data: unknown): Promise<string> {
  const confirm = window.confirm(
    `In this example we will now upload metadata file via the Bundlr Network.

Please make sure your wallet is connected to the Polygon Mumbai testnet.

You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
  );

  if (!confirm) {
    throw new Error('User cancelled');
  }

  const bundlr = await getBundlr();

  const serialized = JSON.stringify(data);
  const tx = await bundlr.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}

export async function uploadImage(file: ILocalFile<ImageType>): Promise<string> {
  const confirm = window.confirm(
    `In this example we will now upload metadata file via the Bundlr Network.

Please make sure your wallet is connected to the Polygon Mumbai testnet.

You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
  );

  if (!confirm) {
    throw new Error('User cancelled');
  }

  const bundlr = await getBundlr();

  const webStream = file.stream();
  const nodeStream = new ReadableWebToNodeStream(webStream);

  const tx = await bundlr.upload(nodeStream as unknown as Readable, {
    tags: [{ name: 'Content-Type', value: file.type }],
  });

  return `https://arweave.net/${tx.id}`;
}
