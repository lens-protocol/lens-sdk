import { Web3Provider } from '@ethersproject/providers';
import { WebIrys } from '@irys/sdk';
import { Uploader } from '@lens-protocol/react-web';
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
      rpcUrl: 'https://rpc-amoy.polygon.technology/',
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
    
    Please make sure your wallet is connected to the Polygon Amoy testnet.
    
    You can get some Amoy MATIC from the Amoy Faucet: https://faucet.polygon.technology/`,
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

export function useIrysUploader() {
  const { data: client } = useConnectorClient();

  return useMemo(() => {
    return new Uploader(async (file: File) => {
      const irys = await getWebIrys(client ?? never('viem Client not found'));

      const confirm = window.confirm(`Uploading '${file.name}' via the Irys.`);

      if (!confirm) {
        throw new Error('User cancelled');
      }

      const receipt = await irys.uploadFile(file);

      return `https://arweave.net/${receipt.id}`;
    });
  }, [client]);
}
