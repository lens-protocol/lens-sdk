import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const ownedHandles = await client.wallet.ownedHandles({
    for: wallet.address,
  });

  const profileId = await client.authentication.getProfileId();

  console.log(`Handles owned by ${wallet.address}:`, ownedHandles);

  console.log(`Linking handle ${ownedHandles.items[0].handle} to profile ${profileId}`);

  await client.profile.linkHandle({
    handle: ownedHandles.items[0].handle,
  });
}

main();
