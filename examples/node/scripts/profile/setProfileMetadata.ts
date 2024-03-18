import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.profile.setProfileMetadata({
    metadataURI: 'https://arweave.net/cv2Rw4g9NhSEXFlq3Ekx1Xo7n76zQSnrx24uBODEkGg',
  });

  const data = result.unwrap();

  if (!isRelaySuccess(data)) {
    console.log(`Something went wrong`, data);
    return;
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: data.txId });
}

main();
