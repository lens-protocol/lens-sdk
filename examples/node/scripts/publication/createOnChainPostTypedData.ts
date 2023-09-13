import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const resultTypedData = await client.publication.createOnchainPostTypedData({
    contentURI: 'ipfs://Qm...', // or arweave
    referenceModule: {
      followerOnlyReferenceModule: false, // anybody can comment or mirror
    },
  });

  const { id, typedData } = resultTypedData.unwrap();

  console.log(`createOnchainPostTypedData result: `, typedData);

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  console.log(`Broadcasting signed createOnchainPostTypedData...`);

  const broadcastResult = await client.transaction.broadcastOnchain({
    id,
    signature: signedTypedData,
  });

  const broadcastValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastValue)) {
    console.log(`Something went wrong`, broadcastValue);
    return;
  }

  console.log(
    `Transaction to create a post was successfuly broadcasted with txId ${broadcastValue.txId}`,
  );

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ txId: broadcastValue.txId });
}

main();
