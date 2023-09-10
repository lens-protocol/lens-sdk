import { isSuccessfulLensProfileManagerResponse } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const recommendedProfiles = await lensClient.profile.fetch({ profileId: "YOUR_PROFILE_ID" });
}

main();
