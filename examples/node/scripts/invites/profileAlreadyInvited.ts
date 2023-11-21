import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const result = await client.invites.profileAlreadyInvited({
    for: address,
  });

  console.log(`Result for ${address}: `, result);
}

main();
