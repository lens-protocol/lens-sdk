import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.profile.unblock({
    profiles: ['PROFILE_ID_TO_BLOCK'],
  });

  const data = result.unwrap();

  if (!isRelaySuccess(data)) {
    console.log(`Something went wrong`, data);
    return;
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: data.txId });
}

main();
