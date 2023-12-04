import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const recommendedProfiles = await client.profile.recommendations({ for: 'YOUR_PROFILE_ID' });

  console.log(
    `First 3 recommended profiles`,
    recommendedProfiles.items.slice(0, 3).map((p) => ({
      id: p.id,
      handle: p.handle,
      isFollowedByMe: p.operations.isFollowedByMe,
    })),
  );

  const result = await client.profile.follow({
    follow: [
      {
        profileId: 'PROFILE_TO_FOLLOW_ID',
      },
    ],
  });

  console.log(
    `Follow of ${recommendedProfiles.items[0].id} triggered with through the Lens Profile Manager: `,
    result.unwrap(),
  );

  const followResultValue = result.unwrap();

  if (!isRelaySuccess(followResultValue)) {
    throw new Error(`Something went wrong`);
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: followResultValue.txId });
}

main();
