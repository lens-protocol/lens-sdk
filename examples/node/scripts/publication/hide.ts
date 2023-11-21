import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  // get user's publications
  // hide one of them

  const result = await client.publication.hide({
    for: '0x014e-0x0a',
  });

  console.log(`Publication was hidden: `, result);
}

main();
