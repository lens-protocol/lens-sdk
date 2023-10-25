import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();

  const allOwnedProfiles = await client.profile.fetchAll({
    where: { ownedBy: [wallet.address] },
  });

  console.log(
    `Profiles owned by address: ${wallet.address}: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
