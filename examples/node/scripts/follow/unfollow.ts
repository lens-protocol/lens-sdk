import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const following = await client.profile.following({ for: 'PROFILE_ID' });

  const result = await client.profile.unfollow({
    unfollow: [following.items[0].id],
  });

  console.log(
    `Follow of ${following.items[0].id} triggered with through the Lens Profile Manager: `,
    result.unwrap(),
  );

  const unfollowResultValue = result.unwrap();

  if (!isRelaySuccess(unfollowResultValue)) {
    throw new Error(`Something went wrong`);
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: unfollowResultValue.txId });
}

main();
