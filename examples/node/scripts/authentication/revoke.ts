import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await client.authentication.getProfileId();

  const result = await client.authentication.fetchAll();
  const value = result.unwrap();

  console.log(`All active sessions for ${profileId}: `, value.items);

  // revoke the oldest session
  await client.authentication.revoke({
    authorizationId: value.items[value.items.length - 1].authorizationId,
  });

  const after = await client.authentication.fetchAll();
  const afterValue = after.unwrap();

  console.log(`All active sessions: `, afterValue.items);
}

main();
