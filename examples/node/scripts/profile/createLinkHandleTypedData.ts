import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await client.authentication.getProfileId();

  const ownedHandles = await client.wallet.ownedHandles({
    for: wallet.address,
  });

  console.log(`Handles owned by ${wallet.address}:`, ownedHandles);

  const linkHandleToProfileTypedData = await client.profile.createLinkHandleTypedData({
    handle: ownedHandles.items[0].handle,
  });

  const data = linkHandleToProfileTypedData.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  console.log(`Linking handle ${ownedHandles.items[0].handle} to profile ${profileId}`);
  const broadcastResult = await client.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    return;
  }

  await client.transaction.waitUntilComplete({ forTxId: broadcastResultValue.txId });

  console.log(`Transaction was successfully broadcasted with txId`, broadcastResultValue.txId);
}

main();
