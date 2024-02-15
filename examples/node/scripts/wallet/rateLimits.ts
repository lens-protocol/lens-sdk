import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();

  const result = await client.wallet.rateLimits({
    userAddress: wallet.address,
  });

  console.log(`Rate limits for ${wallet.address}: `, result);
}

main();
