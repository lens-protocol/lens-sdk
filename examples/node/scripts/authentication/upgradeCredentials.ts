import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  // authenticate with wallet only
  console.log(`Authenticating with wallet only...`);
  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
  });
  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  // prove that it's wallet only
  console.log(`Authenticated wallet address: `, await client.authentication.getWalletAddress());
  console.log(`Authenticated profileId: `, await client.authentication.getProfileId());

  // upgrade to profile authentication
  console.log(`Upgrading credentials to profile authentication...`);

  const managedProfiles = await client.wallet.profilesManaged({ for: wallet.address });
  if (managedProfiles.items.length === 0) {
    throw new Error(`You don't manage any profiles, create one first`);
  }

  await client.authentication.upgradeCredentials({
    profileId: managedProfiles.items[0].id,
  });

  // prove that it's profile authentication
  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
  console.log(`Authenticated profileId: `, await client.authentication.getProfileId());
}

main();
