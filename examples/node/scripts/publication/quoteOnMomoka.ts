import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.publication.quoteOnMomoka({
    quoteOn: '0x123-0x456',
    contentURI: 'ipfs://Qm...', // or arweave
  });

  const resultValue = result.unwrap();

  if (!isCreateMomokaPublicationResult(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successful`, resultValue);
}

main();
