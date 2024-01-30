import { NodeBundlr } from '@bundlr-network/client';
import { Wallet } from '@ethersproject/wallet';
import { UnknownObject } from '@lens-protocol/shared-kernel';

export class BundlrUploader {
  constructor(private readonly signer: Wallet) {}

  async upload(data: UnknownObject): Promise<string> {
    const bundlr = new NodeBundlr(
      'https://devnet.bundlr.network',
      'matic',
      this.signer.privateKey,
      {
        providerUrl: 'https://rpc-mumbai.maticvigil.com/',
      },
    );
    const atomicBalance = await bundlr.getLoadedBalance();
    const balance = bundlr.utils.fromAtomic(atomicBalance);

    // fund bundlr balance if empty
    if (balance.lte(0.001)) {
      try {
        await bundlr.fund(0.1e18); // 0.1 MUMBAI MATIC
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          `Cannot fund ${String(
            bundlr.address,
          )} Bundlr balance. Mumbai ${balance.toString()} MATIC available.`,
        );
      }
    }

    const serialized = JSON.stringify(data);
    const tx = await bundlr.upload(serialized, {
      tags: [{ name: 'Content-Type', value: 'application/json' }],
    });

    return `https://arweave.net/${tx.id}`;
  }
}
