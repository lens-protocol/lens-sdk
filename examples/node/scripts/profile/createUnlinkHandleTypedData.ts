import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const unlinkHandleFromProfileTypedData = await client.profile.createUnlinkHandleTypedData({
    handle: 'HANDLE',
  });

  const data = unlinkHandleFromProfileTypedData.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await client.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    return;
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: broadcastResultValue.txId });
}

main();
