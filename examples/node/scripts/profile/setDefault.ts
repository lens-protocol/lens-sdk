import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  if (!profileId) {
    throw new Error('Profile not authenticated');
  }

  console.log(`Setting default profile for wallet ${wallet.address} to ${profileId}`);
  await client.profile.setDefault({
    profileId,
  });

  const defaultProfile = await client.profile.fetchDefault({
    for: wallet.address,
  });

  console.log(`Default profile for wallet ${wallet.address}: `, {
    id: defaultProfile?.id,
    handle: defaultProfile?.handle,
  });
}

main();
