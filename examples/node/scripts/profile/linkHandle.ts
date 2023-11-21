import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const ownedHandles = await client.wallet.ownedHandles({
    for: wallet.address,
  });

  const profileId = await client.authentication.getProfileId();

  console.log(`Handles owned by ${wallet.address}:`, ownedHandles);

  console.log(`Linking handle ${ownedHandles.items[0].fullHandle} to profile ${profileId}`);

  await client.profile.linkHandle({
    handle: ownedHandles.items[0].fullHandle,
  });
}

main();
