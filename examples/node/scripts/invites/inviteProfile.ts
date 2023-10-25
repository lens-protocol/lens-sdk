import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.invites.inviteProfile({
    invites: ['0x1234567890123456789012345678901234567890'],
  });

  console.log(`Result: `, result.unwrap());
}

main();
