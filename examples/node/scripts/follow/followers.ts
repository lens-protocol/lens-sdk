import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await lensClient.profile.followers({
    of: "PROFILE_ID",
  });

  console.log(
    `Followers:`,
    result.items.map((p) => p.handle)
  );
}

main();
