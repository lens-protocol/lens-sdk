import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
    headers: {
      origin: 'https://lens-scripts.example',
    },
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const managedProfiles = await client.wallet.profilesManaged({ for: wallet.address });

  if (managedProfiles.items.length === 0) {
    throw new Error(`You don't manage any profiles, create one first`);
  }

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
    for: managedProfiles.items[0].id,
  });

  console.log(`Challenge: `, text); // Notice the origin URL in the challenge message

  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
}

main();
