import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from './shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const ownedProfiles = await client.profile.fetchAll({ where: { ownedBy: [address] } });

  if (ownedProfiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
    for: ownedProfiles.items[0].id,
  });

  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  const accessTokenResult = await client.authentication.getAccessToken();
  const accessToken = accessTokenResult.unwrap();

  const profileIdResult = await client.authentication.getProfileId();
  const profileId = profileIdResult.unwrap();

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
  console.log(`Authenticated profileId: `, profileId);
  console.log(`Access token: `, accessToken);
  console.log(`Is access token valid? `, await client.authentication.verify(accessToken));
}

main();
