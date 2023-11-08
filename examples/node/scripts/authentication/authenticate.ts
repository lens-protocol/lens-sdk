import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
    headers: {
      origin: 'https://lens-scripts.example',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    },
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

  console.log(`Challenge: `, text);

  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  const accessTokenResult = await client.authentication.getAccessToken();
  const accessToken = accessTokenResult.unwrap();

  const profileId = await client.authentication.getProfileId();

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
  console.log(`Authenticated profileId: `, profileId);
  console.log(`Access token: `, accessToken);
  console.log(`Is access token valid? `, await client.authentication.verify(accessToken));
}

main();
