import { isRelaySuccess, isSuccessfulLensProfileManagerResponse } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";
import { LensTransactionStatusType } from "@lens-protocol/client/src/graphql/types.generated";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await lensClient.profile.setProfileMetadata({
    metadataURI: "metadata-uri",
  });

  const data = result.unwrap();

  if (!isSuccessfulLensProfileManagerResponse(data)) {
    console.log(`Something went wrong`, data);
    return;
  }

  await lensClient.transaction.waitUntilComplete({ txId: data.txId });
}

main();
