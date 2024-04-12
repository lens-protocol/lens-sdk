import Irys from '@irys/sdk';

import { walletPrivateKey } from './setupWallet';

export async function uploadWithIrys(data: { [key: string]: unknown }): Promise<string> {
  const irys = new Irys({
    url: 'https://devnet.irys.xyz',
    token: 'matic',
    key: walletPrivateKey,
    config: { providerUrl: 'https://rpc-amoy.polygon.technology/' },
  });

  const atomicBalance = await irys.getLoadedBalance();
  const balance = irys.utils.fromAtomic(atomicBalance);

  console.log(
    `Irys balance for wallet ${String(irys.address)} is ${balance.toString()} AMOY MATIC`,
  );

  // fund Irys balance if empty
  if (balance.eq(0)) {
    console.log('Trying to fund your irys balance with 0.1 AMOY MATIC');

    await irys.fund(0.1e18); // 0.1 AMOY MATIC
  }

  const serialized = JSON.stringify(data);
  const tx = await irys.upload(serialized, {
    tags: [{ name: 'Content-Type', value: 'application/json' }],
  });

  return `https://arweave.net/${tx.id}`;
}
