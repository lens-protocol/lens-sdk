import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.publication.mirrorOnMomoka({
    mirrorOn: '0x123-0x456',
  });

  const resultValue = result.unwrap();

  if (!isCreateMomokaPublicationResult(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successful`, resultValue);
}

main();
