import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await client.profile.createFollowTypedData({
    follow: [
      {
        profileId: 'PROFILE_TO_FOLLOW_ID',
      },
    ],
  });

  const data = result.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await client.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const followBroadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Transaction to follow was successfully broadcasted with txId ${followBroadcastResultValue.txId}`,
  );

  // wait for follow to be indexed
  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: followBroadcastResultValue.txId });
}

main();
