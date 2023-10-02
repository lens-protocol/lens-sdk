import { LensClient, development } from '@lens-protocol/client';

import { getOwnedProfileId } from '../shared/getOwnedProfileId';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const profileId = await getOwnedProfileId(client, wallet.address);

  const result = await client.profile.managers({
    for: profileId,
  });

  console.log(`Managers for profile ${profileId}: `, result.items);
}

main();
