import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const contentURI = 'https://arweave.net/Ff8hn9iT0RXG3S_l0_AbYRb1OzY-4WS9QDRsEHBQpgw';

  const resultTypedData = await client.publication.createOnchainPostTypedData({
    contentURI,
  });

  const { id, typedData } = resultTypedData.unwrap();

  console.log(`Typed data: `, typedData);

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  console.log(`Broadcasting signed typed data...`);

  const broadcastResult = await client.transaction.broadcastOnchain({
    id,
    signature: signedTypedData,
  });

  const broadcastValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastValue)) {
    console.log(`Something went wrong`, broadcastValue);
    return;
  }

  console.log(`Transaction was successfully broadcasted with txId`, broadcastValue.txId);

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: broadcastValue.txId });
}

main();
