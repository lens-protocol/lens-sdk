import { WebBundlr } from '@bundlr-network/client';
import { fetchSigner } from 'wagmi/actions';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export async function upload(data: unknown): Promise<string> {
  const confirm = window.confirm(
    `We will now upload metadata file via the Bundlr Network.

Please make sure your wallet is connected to the Polygon Mumbai testnet.

You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
  );

  if (!confirm) {
    throw new Error('User cancelled');
  }

  const signer = await fetchSigner();

  const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', signer?.provider, {
    providerUrl: 'https://rpc-mumbai.maticvigil.com/',
  });

  await bundlr.ready();

  const balance = await bundlr.getBalance((await signer?.getAddress()) ?? never());

  if (bundlr.utils.unitConverter(balance).toNumber() < MIN_FUNDS) {
    await bundlr.fund(TOP_UP);
  }

  const serialized = JSON.stringify(data);
  const tx = await bundlr.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}
