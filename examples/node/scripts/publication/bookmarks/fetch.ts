import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.publication.bookmarks.fetch();

  const value = result.unwrap();

  console.log('Your bookmarks count: ', value.items.length);
}

main();
