import Bundlr from '@bundlr-network/client';

import { walletPrivateKey } from './setupWallet';

export async function uploadWithBundlr(data: { [key: string]: unknown }): Promise<string> {
  const bundlr = new Bundlr('https://devnet.bundlr.network', 'matic', walletPrivateKey, {
    providerUrl: 'https://rpc-mumbai.maticvigil.com/',
  });

  const atomicBalance = await bundlr.getLoadedBalance();
  const balance = bundlr.utils.fromAtomic(atomicBalance);

  console.log(
    `Bundlr balance for wallet ${String(bundlr.address)} is ${balance.toString()} MUMBAI MATIC`,
  );

  // fund bundlr balance if empty
  if (balance.eq(0)) {
    console.log('Trying to fund your Bundlr balance with 0.1 MUMBAI MATIC');

    await bundlr.fund(0.1e18); // 0.1 MUMBAI MATIC
  }

  const serialized = JSON.stringify(data);
  const tx = await bundlr.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}
