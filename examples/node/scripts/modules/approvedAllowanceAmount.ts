import { FollowModuleType } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const currencies = await client.modules.fetchCurrencies();

  const result = await client.modules.approvedAllowanceAmount({
    currencies: currencies.items.map((currency) => currency.contract.address),
    followModules: [FollowModuleType.FeeFollowModule],
  });

  console.log('Result: ', result.unwrap());
}

main();
