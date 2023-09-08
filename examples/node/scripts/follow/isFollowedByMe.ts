import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const { isFollowedByMe } = await lensClient.profile.fetch({
    profileId: "PROFILE_ID",
  });

  console.log({ isFollowedByMe });
}

main();
