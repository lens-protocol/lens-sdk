import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
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

  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  const identityTokenResult = await client.authentication.getIdentityToken();
  const identityToken = identityTokenResult.unwrap();

  console.log(`Identity token: `, identityToken);
  console.log(`Is identity token valid? `, await client.authentication.verify({ identityToken }));
}

main();
