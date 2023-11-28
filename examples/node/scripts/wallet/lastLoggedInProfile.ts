import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const result = await client.wallet.lastLoggedInProfile({
    for: address,
  });

  if (!result) {
    console.log(`No profile found for ${address}`);
    return;
  }

  console.log(`Last logged in profile for ${address}: `, {
    id: result.id,
    handle: result.handle,
  });
}

main();
