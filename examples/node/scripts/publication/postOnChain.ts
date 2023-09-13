import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.publication.postOnchain({
    contentURI: 'ipfs://Qm...', // or arweave
    referenceModule: {
      followerOnlyReferenceModule: false, // anybody can comment or mirror
    },
  });

  const resultValue = result.unwrap();

  if (!isRelaySuccess(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successfuly broadcasted with txId ${resultValue.txId}`);

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ txId: resultValue.txId });
}

main();
