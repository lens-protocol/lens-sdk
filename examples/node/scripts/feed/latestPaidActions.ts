import { isFollowPaidAction, isOpenActionPaidAction } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.feed.latestPaidActions();

  result.unwrap().items.map((item) => {
    const actingProfileIds = item.latestActed.map((acted) => acted.profile.id).join(', ');

    if (isFollowPaidAction(item)) {
      console.log(`Profiles ${actingProfileIds} followed: ${item.followed.id}`);
    }

    if (isOpenActionPaidAction(item)) {
      console.log(
        `Profiles ${actingProfileIds} acted on: ${item.actedOn.__typename} ${item.actedOn.id}`,
      );
    }
  });
}

main();
