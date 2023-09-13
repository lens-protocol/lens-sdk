import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await lensClient.profile.following({
    for: 'PROFILE_ID',
  });

  console.log(
    `Following:`,
    result.items.map((p) => p.handle),
  );
}

main();
