import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await lensClient.profile.setProfileMetadata({
    metadataURI: "metadata-uri",
  });

  const data = result.unwrap();

  if (!isRelaySuccess(data)) {
    console.log(`Something went wrong`, data);
    return;
  }

  await lensClient.transaction.waitUntilComplete({ txId: data.txId });
}

main();
