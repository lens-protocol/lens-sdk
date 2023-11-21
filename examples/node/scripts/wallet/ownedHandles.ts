import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const result = await client.wallet.ownedHandles({
    for: address,
  });

  console.log(`Owned handles by ${address}: `, result.items);
}

main();
