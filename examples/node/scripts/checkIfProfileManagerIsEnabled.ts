import { getAuthenticatedClientFromEthersWallet } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const profile = await lensClient.profile.fetch({
    profileId: ["your-profile-id"],
  });

  if (profile.gasless.enabled) {
    console.log("Profile manager is enabled");
  } else {
    console.log("Profile manager is disabled");
  }
}

main();
