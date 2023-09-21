import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.profile.followers({
    of: 'PROFILE_ID',
  });

  console.log(
    `Followers:`,
    result.items.map((p) => p.handle),
  );
}

main();
