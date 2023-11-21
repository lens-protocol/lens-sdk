import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.profile.whoHaveBeenBlocked();

  console.log(
    `Result: `,
    result.unwrap().items.map((i) => ({
      id: i.id,
      handle: i.handle,
    })),
  );
}

main();
