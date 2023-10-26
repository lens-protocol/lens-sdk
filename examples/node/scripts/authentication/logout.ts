import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());

  console.log(`Logging out...`);
  await client.authentication.logout();

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
}

main();
