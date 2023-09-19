import {
  getAuthenticatedClientFromEthersWallet,
  getOwnedProfileId,
} from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await getOwnedProfileId(lensClient, wallet.address);

  const profile = await lensClient.profile.fetch({
    forProfileId: profileId,
  });

  if (profile.sponsor) {
    console.log('Profile manager is enabled');
  } else {
    console.log('Profile manager is disabled');
  }
}

main();
