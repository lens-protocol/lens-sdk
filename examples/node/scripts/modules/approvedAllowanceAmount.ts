import { FollowModuleType } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const currencies = await client.modules.fetchCurrencies();

  const currenciesForAllowanceCheck = currencies.items
    .slice(0, 2) // max 3 currencies allowed by API
    .map((currency) => currency.contract.address);

  const result = await client.modules.approvedAllowanceAmount({
    currencies: currenciesForAllowanceCheck,
    followModules: [FollowModuleType.FeeFollowModule],
  });

  console.log('Result: ', result.unwrap());
}

main();
