import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const typedDataResult = await client.publication.createMomokaQuoteTypedData({
    quoteOn: '0x123-0x456',
    contentURI: 'ipfs://Qm...', // or arweave
  });

  const { id, typedData } = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  const broadcastResult = await client.transaction.broadcastOnMomoka({
    id,
    signature: signedTypedData,
  });

  const broadcastValue = broadcastResult.unwrap();

  if (!isCreateMomokaPublicationResult(broadcastValue)) {
    console.log(`Something went wrong`);
    return;
  }

  console.log(`Successfully broadcasted momoka transaction`, broadcastValue);
}

main();
