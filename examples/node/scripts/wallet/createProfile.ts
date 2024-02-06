import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const client = new LensClient({
    environment: development,
  });

  console.log(`Creating a new profile for ${address}"`);

  const profileCreateResult = await client.wallet.createProfile({
    to: address,
  });

  console.log(
    `Transaction to create a new profile was successfully broadcasted with txId`,
    profileCreateResult.txId,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: profileCreateResult.txId });

  const allOwnedProfiles = await client.profile.fetchAll({
    where: {
      ownedBy: [address],
    },
  });

  console.log(
    `All owned profiles: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
