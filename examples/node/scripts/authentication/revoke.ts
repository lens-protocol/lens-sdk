import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const authorizationId = await client.authentication.getAuthorizationId();

  if (!authorizationId) {
    throw new Error(`Not authenticated`);
  }

  await client.authentication.revoke({
    authorizationId,
  });

  // fetch current session
  const after = await client.authentication.fetch();
  const afterValue = after.unwrap();

  console.log(`Active session: `, afterValue);
}

main();
