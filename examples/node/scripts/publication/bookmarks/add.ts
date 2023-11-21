import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  await client.publication.bookmarks.add({
    on: '0x123-0x456',
  });

  console.log('Successfully added a bookmark');
}

main();
