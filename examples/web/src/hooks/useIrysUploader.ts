import { Web3Provider } from '@ethersproject/providers';
import { WebIrys } from '@irys/sdk';
import { URI, Uploader, uri } from '@lens-protocol/react-web';
import { DataItem, ArweaveSigner } from 'arbundles';
import Arweave from 'arweave';
import { useMemo } from 'react';
import { Account, Chain, Client, Transport } from 'viem';
import { useConnectorClient } from 'wagmi';

import { never } from '../utils';

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

async function getWebIrys(client: Client<Transport, Chain, Account>) {
  const webIrys = new WebIrys({
    url: 'https://devnet.irys.xyz',
    token: 'matic',
    wallet: {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      name: 'ethersv5',
      provider: new Web3Provider(client.transport),
    },
  });

  await webIrys.ready();

  const balance = await webIrys.getBalance(client.account.address);

  if (webIrys.utils.fromAtomic(balance).toNumber() < MIN_FUNDS) {
    await webIrys.fund(TOP_UP);
  }

  return webIrys;
}

export function useIrysUploadHandler() {
  const { data: client } = useConnectorClient();

  return async (data: unknown) => {
    const confirm = window.confirm(
      `In this example we will now upload metadata file via the Irys.
    
    Please make sure your wallet is connected to the Polygon Mumbai testnet.
    
    You can get some Mumbai MATIC from the Mumbai Faucet: https://mumbaifaucet.com/`,
    );

    if (!confirm) {
      throw new Error('User cancelled');
    }

    const irys = await getWebIrys(client ?? never('viem Client not found'));

    const serialized = JSON.stringify(data);
    const tx = await irys.upload(serialized, {
      tags: [{ name: 'Content-Type', value: 'application/json' }],
    });

    return `https://arweave.net/${tx.id}`;
  };
}

class IrysUploader extends Uploader {
  private _manifestTx: DataItem | null = null;
  private _txs: DataItem[] = [];
  private _items = new Map<string, string>();
  private _ephemeralSigner: ArweaveSigner | null = null;

  private get client() {
    return this._client ?? never('viem Client not found');
  }

  private get ephemeralSigner() {
    return this._ephemeralSigner ?? never('Ephemeral signer not found');
  }

  constructor(private readonly _client: Client<Transport, Chain, Account> | undefined) {
    super();
  }

  override async initialize() {
    const jwk = await Arweave.crypto.generateJWK();
    this._ephemeralSigner = new ArweaveSigner(jwk);

    this._manifestTx = null;
    this._txs = [];
    this._items = new Map();
  }

  override async addFile(file: File): Promise<URI> {
    const irys = await getWebIrys(this.client);

    const referenceId = await this.prepare(irys);

    const tx = irys.arbundles.createData(
      Buffer.from(await file.arrayBuffer()),
      this.ephemeralSigner,
      {
        tags: [{ name: 'Content-Type', value: file.type }],
      },
    );
    await tx.sign(this.ephemeralSigner);
    this._txs.push(tx);
    this._items.set(file.name, tx.id);

    return uri(`https://gateway.irys.xyz/mutable/${referenceId}/${file.name}`);
  }

  override async finalize(): Promise<void> {
    if (!this._manifestTx) {
      throw new Error('Manifest not found');
    }

    const irys = await getWebIrys(this.client);

    const manifest = await irys.uploader.generateManifest({
      items: this._items,
    });

    const updatedManifestTx = irys.arbundles.createData(
      JSON.stringify(manifest),
      this.ephemeralSigner,
      {
        tags: [
          { name: 'Type', value: 'manifest' },
          { name: 'Content-Type', value: 'application/x.arweave-manifest+json' },
          { name: 'Root-TX', value: this._manifestTx.id },
        ],
      },
    );

    await updatedManifestTx.sign(this.ephemeralSigner);

    this._txs.push(updatedManifestTx);

    await irys.uploader.uploadBundle(this._txs);
  }

  private async prepare(irys: WebIrys) {
    if (this._manifestTx) {
      return this._manifestTx.id;
    }
    const manifest = await irys.uploader.generateManifest({
      items: new Map<string, string>(),
    });
    this._manifestTx = irys.arbundles.createData(JSON.stringify(manifest), this.ephemeralSigner, {
      tags: [
        { name: 'Type', value: 'manifest' },
        { name: 'Content-Type', value: 'application/x.arweave-manifest+json' },
      ],
    });
    await this._manifestTx.sign(this.ephemeralSigner);

    this._txs.push(this._manifestTx);

    return this._manifestTx.id;
  }
}

export function useIrysUploader() {
  const { data: client } = useConnectorClient();

  return useMemo(() => new IrysUploader(client), [client]);
}
