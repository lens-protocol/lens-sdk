import { WebBundlr } from '@bundlr-network/client';
import { Web3Provider } from '@ethersproject/providers';
import { getWalletClient } from 'wagmi/actions';

import { never } from './utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

async function getBundlr() {
  const walletClient = (await getWalletClient()) ?? never('Wallet client not found');

  const bundlr = new WebBundlr(
    'https://devnet.bundlr.network',
    'matic',
    new Web3Provider(walletClient.transport),
    {
      providerUrl: 'https://rpc-mumbai.maticvigil.com/',
    },
  );

  await bundlr.ready();

  const balance = await bundlr.getBalance(walletClient.account.address);

  if (bundlr.utils.unitConverter(balance).toNumber() < MIN_FUNDS) {
    await bundlr.fund(TOP_UP);
  }

  return bundlr;
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

  const bundlr = await getBundlr();

  const serialized = JSON.stringify(data);
  const tx = await bundlr.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}
