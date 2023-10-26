import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const result = await client.authentication.fetch();

  const value = result.unwrap();

  console.log(`Current sessions for ${profileId}: `, value);
}

main();
