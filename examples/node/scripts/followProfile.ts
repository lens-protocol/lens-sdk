import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { signAndBroadcast } from "./shared/signAndBroadcast";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClient(wallet);

  // get recommended profiles to follow
  const recommendedProfiles = await lensClient.profile.allRecommended();

  console.log(
    `First 3 recommended profiles`,
    recommendedProfiles.slice(0, 3).map((p) => ({
      id: p.id,
      handle: p.handle,
      isFollowedByMe: p.isFollowedByMe,
    }))
  );

  // the easiest is to use ProxyAction to follow a profile
  const proxyActionResult = await lensClient.proxyAction.freeFollow(recommendedProfiles[0].id);
  console.log(
    `Free follow of ${recommendedProfiles[0].id} triggered with proxyActionId: `,
    proxyActionResult.unwrap()
  );

  // you can also wait for proxyAction to be completed
  // await lensClient.proxyAction.waitForStatusComplete(proxyActionResult.unwrap());

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

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Transaction to follow ${recommendedProfiles[1].id} was successfuly broadcasted with txId ${followBroadcastResultValue.txId}`
  );

  // wait for follow to be indexed
  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitForIsIndexed(followBroadcastResultValue.txId);

  // check the isFollowedByMe property
  const justFollowedProfile = await lensClient.profile.fetch({
    profileId: recommendedProfiles[1].id,
  });

  console.log(`Just followed profile`, {
    id: justFollowedProfile.id,
    handle: justFollowedProfile.handle,
    isFollowedByMe: justFollowedProfile.isFollowedByMe,
  });

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

  if (!isRelaySuccess(unfollowBroadcastResultValue)) {
    console.log(`Something went wrong`, unfollowBroadcastResultValue);
    return;
  }

  console.log(
    `Transaction to unfollow ${recommendedProfiles[1].id} was successfuly broadcasted with txId ${unfollowBroadcastResultValue.txId}`
  );
}

main();
