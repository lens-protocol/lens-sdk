import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const profile = await client.profile.fetch({
    forProfileId: profileId,
  });

  if (profile?.signless) {
    console.log('Profile manager is enabled');
  } else {
    console.log('Profile manager is disabled');
  }
}

main();
