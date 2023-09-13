import { isCreateMomokaPublicationResult } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const typedDataResult = await lensClient.publication.createMomokaCommentTypedData({
    commentOn: '0x123-0x456',
    contentURI: 'ipfs://Qm...', // or arweave
  });

  const { id, typedData } = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  const broadcastResult = await lensClient.transaction.broadcastOnMomoka({
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
