import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const following = await lensClient.profile.following({ for: "PROFILE_TO_UNFOLLOW_ID" });

  const result = await lensClient.profile.createUnfollowTypedData({
    unfollow: [following[1].id],
  });

  const data = result.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcastOnChain({
    id: data.id,
    signature: signedTypedData,
  });

  const followBroadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Transaction to follow ${following[1].id} was successfuly broadcasted with txId ${followBroadcastResultValue.txId}`
  );

  // wait for follow to be indexed
  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitUntilComplete({ txId: followBroadcastResultValue.txId });
}

main();
