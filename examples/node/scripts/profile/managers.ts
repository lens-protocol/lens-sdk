import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const ownedProfiles = await client.profile.fetchAll({ where: { ownedBy: [wallet.address] } });

  console.log(
    `Owned profiles: `,
    ownedProfiles.items.map((profile) => profile.id),
  );

  const profileId = ownedProfiles.items[0].id;

  const result = await client.profile.managers({
    for: profileId,
  });

  console.log(`Managers for profile ${profileId}: `, result.items);
}

main();
