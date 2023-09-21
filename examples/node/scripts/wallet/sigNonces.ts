import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.wallet.sigNonces();

  console.log(`Nonces for current user: `, result.unwrap());
}

main();
