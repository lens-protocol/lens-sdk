import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.profile.following({
    for: 'PROFILE_ID',
  });

  console.log(
    `Following:`,
    result.items.map((p) => p.handle),
  );
}

main();
