import { LensClient, development, isRelaySuccess } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const client = new LensClient({
    environment: development,
  });

  const handle = Date.now().toString();

  console.log(`Creating a new profile for ${address} with handle "${handle}"`);

  const profileCreateResult = await client.wallet.createProfileWithHandle({
    handle: handle,
    to: address,
  });

  if (!isRelaySuccess(profileCreateResult)) {
    console.log(`Something went wrong`, profileCreateResult);
    return;
  }

  console.log(
    `Transaction to create a new profile with handle "${handle}" was successfully broadcasted with txId`,
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

  const newProfile = allOwnedProfiles.items.find((item) => item.handle?.localName === handle);

  if (newProfile) {
    console.log(`The newly created profile's id is: ${newProfile.id}`);
  }
}

main();
