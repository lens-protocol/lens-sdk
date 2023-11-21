import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  await client.publication.notInterested.add({
    on: '0x123-0x456',
  });

  console.log('Successfully added to not interested');
}

main();
