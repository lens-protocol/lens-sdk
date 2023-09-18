import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const following = await lensClient.profile.following({ for: 'PROFILE_ID' });

  const profileToUnfollowId = following.items[0].id;

  const followTypedDataResult = await lensClient.profile.createUnfollowTypedData({
    unfollow: [profileToUnfollowId],
  });

  const data = followTypedDataResult.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await lensClient.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const followBroadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Transaction to follow ${profileToUnfollowId} was successfuly broadcasted with txId ${followBroadcastResultValue.txId}`,
  );

  // wait for follow to be indexed
  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitUntilComplete({ txId: followBroadcastResultValue.txId });

  // check the isFollowedByMe property
  const justFollowedProfile = await lensClient.profile.fetch({
    forProfileId: profileToUnfollowId,
  });

  console.log(`Just followed profile`, {
    id: justFollowedProfile.id,
    handle: justFollowedProfile.handle,
    isFollowedByMe: justFollowedProfile.operations.isFollowedByMe,
  });
}

main();
