import { isSuccessfulLensProfileManagerResponse } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const following = await lensClient.profile.following({ for: "PROFILE_ID" });

  const result = await lensClient.profile.unfollow({
    unfollow: [following.items[0].id],
  });

  console.log(
    `Follow of ${following[0].id} triggered with through the Lens Profile Manager: `,
    result.unwrap()
  );

  const unfollowResultValue = result.unwrap();

  if (!isSuccessfulLensProfileManagerResponse(unfollowResultValue)) {
    throw new Error(`Something went wrong`);
  }

  await lensClient.transaction.waitUntilComplete({ txId: unfollowResultValue.txId });
}

main();
