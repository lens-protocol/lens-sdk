import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const ownedHandles = await client.wallet.ownedHandles({
    for: wallet.address,
  });

  console.log(`Handles owned by ${wallet.address}:`, ownedHandles);

  const linkHandleToProfileTypedData = await client.profile.createLinkHandleTypedData({
    handle: ownedHandles.items[0].fullHandle,
  });

  const data = linkHandleToProfileTypedData.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  console.log(`Linking handle ${ownedHandles.items[0].fullHandle} to profile ${profileId}`);
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
