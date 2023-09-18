import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const handle = Date.now().toString();

  console.log(`Claiming a profile for ${address} with handle "${handle}"`);

  const result = await lensClient.profile.claim({
    id: 'ID',
    freeTextHandle: 'CHOSEN_HANDLE',
  });

  const claimResultValue = result.unwrap();

  if (!isRelaySuccess(claimResultValue)) {
    console.log(`Something went wrong`, result);
    return;
  }

  console.log(
    `Transaction to claim profile with handle "${handle}" was successfully broadcasted with txId ${claimResultValue.txId}`,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitUntilComplete({ txId: claimResultValue.txId });
}

main();
