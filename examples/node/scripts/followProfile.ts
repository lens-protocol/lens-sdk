import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { signAndBroadcast } from "./shared/signAndBroadcast";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClient(wallet);

  // get recommended profiles to follow
  const recommendedProfiles = await lensClient.profile.allRecommended();

  // the easiest is to use ProxyAction to follow a profile
  await lensClient.proxyAction.freeFollow(recommendedProfiles[0].id);

  // another way is to request follow typed data, sign them and broadcast
  const followTypedDataResult = await lensClient.profile.createFollowTypedData({
    follow: [
      {
        profile: recommendedProfiles[1].id,
      },
    ],
  });

  const followBroadcastResultValue = await signAndBroadcast(
    lensClient,
    wallet,
    followTypedDataResult
  );

  if ("txId" in followBroadcastResultValue) {
    console.log(
      `Transaction to follow ${recommendedProfiles[1].id} was successfuly broadcasted with txId ${followBroadcastResultValue.txId}`
    );
  }

  // to unfollow you need to request unfollow typed data, sign and broadcast
  // but also make sure that you follow that profile first
  const unfollowTypedDataResult = await lensClient.profile.createUnfollowTypedData({
    profile: recommendedProfiles[1].id,
  });

  const unfollowBroadcastResultValue = await signAndBroadcast(
    lensClient,
    wallet,
    unfollowTypedDataResult
  );

  if ("txId" in unfollowBroadcastResultValue) {
    console.log(
      `Transaction to unfollow ${recommendedProfiles[1].id} was successfuly broadcasted with txId ${followBroadcastResultValue.txId}`
    );
  }
}

main();
