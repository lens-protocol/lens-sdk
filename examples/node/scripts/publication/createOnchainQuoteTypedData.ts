import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const resultTypedData = await client.publication.createOnchainQuoteTypedData({
    quoteOn: '0x123-0x456',
    contentURI: 'ipfs://Qm...', // or arweave
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

  console.log(`Transaction was successfuly broadcasted with txId ${broadcastValue.txId}`);

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ txId: broadcastValue.txId });
}

main();
