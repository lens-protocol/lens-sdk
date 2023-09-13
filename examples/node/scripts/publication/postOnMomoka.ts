import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.publication.postOnMomoka({
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
