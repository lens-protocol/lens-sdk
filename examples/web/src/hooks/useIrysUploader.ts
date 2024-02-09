import { Web3Provider } from '@ethersproject/providers';
import { WebIrys } from '@irys/sdk';
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

export function useIrysUploader() {
  const { data: client } = useConnectorClient();

  return {
    uploadMetadata: async (data: unknown) => {
      const confirm = window.confirm(
        `In this example we will now upload metadata file via the Bundlr Network.
    
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
    },
  };
}
