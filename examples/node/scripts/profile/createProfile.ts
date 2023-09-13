import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const handle = Date.now().toString();

  console.log(`Creating a new profile for ${address} with handle "${handle}"`);

  const profileCreateResult = await lensClient.profile.create({
    handle: handle,
    to: 'YOUR_EVM_ADDRESS',
  });

  if (!isRelaySuccess(profileCreateResult)) {
    console.log(`Something went wrong`, profileCreateResult);
    return;
  }

  console.log(
    `Transaction to create a new profile with handle "${handle}" was successfuly broadcasted with txId ${profileCreateResult.txId}`,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitUntilComplete({ txId: profileCreateResult.txId });

  const allOwnedProfiles = await lensClient.profile.fetchAll({
    where: {
      ownedBy: [address],
    },
  });

  console.log(
    `All owned profiles: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  const newProfile = allOwnedProfiles.items.find((item) => item.handle === `${handle}.test`);

  if (newProfile) {
    console.log(`The newly created profile's id is: ${newProfile.id}`);
  }
}

main();
