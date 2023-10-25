import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const result = await client.authentication.fetchAll();

  const value = result.unwrap();

  console.log(`All active sessions for ${profileId}: `, value.items);
}

main();
