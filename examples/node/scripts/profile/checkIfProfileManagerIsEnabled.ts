import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { getOwnedProfileId } from '../shared/getOwnedProfileId';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await getOwnedProfileId(client, wallet.address);

  const profile = await client.profile.fetch({
    forProfileId: profileId,
  });

  if (profile.lensManager) {
    console.log('Profile manager is enabled');
  } else {
    console.log('Profile manager is disabled');
  }
}

main();
