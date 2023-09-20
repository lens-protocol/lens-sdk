import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const blockProfilesTypedData = await lensClient.profile.createBlockProfilesTypedData({
    profiles: ['PROFILE_ID_TO_BLOCK'],
  });

  const data = blockProfilesTypedData.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await lensClient.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    return;
  }

  await lensClient.transaction.waitUntilComplete({ forTxId: broadcastResultValue.txId });

  console.log(`Transaction was successfully broadcasted with txId ${broadcastResultValue.txId}`);
}

main();
