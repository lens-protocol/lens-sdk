import { isSuccessfulLensProfileManagerResponse } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const recommendedProfiles = await lensClient.profile.recommendations({ for: "YOUR_PROFILE_ID" });

  console.log(
    `First 3 recommended profiles`,
    recommendedProfiles.items.slice(0, 3).map((p) => ({
      id: p.id,
      handle: p.handle,
      isFollowedByMe: p.isFollowedByMe,
    }))
  );

  const result = await lensClient.profile.follow({
    follow: [
      {
        profileId: "PROFILE_TO_FOLLOW_ID",
      },
    ],
  });

  console.log(
    `Follow of ${recommendedProfiles[0].id} triggered with through the Lens Profile Manager: `,
    result.unwrap()
  );

  const followResultValue = result.unwrap();

  if (!isSuccessfulLensProfileManagerResponse(followResultValue)) {
    throw new Error(`Something went wrong`);
  }

  await lensClient.transaction.waitUntilComplete({ txId: followResultValue.txId });
}

main();
