import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const contentURI = 'https://arweave.net/Ff8hn9iT0RXG3S_l0_AbYRb1OzY-4WS9QDRsEHBQpgw';

  const result = await client.publication.postOnMomoka({
    contentURI,
  });

  const resultValue = result.unwrap();

  if (!isCreateMomokaPublicationResult(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successful`, resultValue);
}

main();
