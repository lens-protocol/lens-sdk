import { isMomokaRelayResult, isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { LensTransactionStatusType } from "@lens-protocol/client/src/graphql/types.generated";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const typedDataResult = await lensClient.publication.createMomokaPostTypedData({
    contentURI: "your-content-uri",
  });

  const { id, typedData } = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  const broadcastOnMomokaResult = await lensClient.transaction.broadcastOnMomoka({
    id,
    signature: signedTypedData,
  });

  const momokaRelayResult = broadcastOnMomokaResult.unwrap();

  if (!isMomokaRelayResult(momokaRelayResult)) {
    console.log(`Something went wrong`);
    return;
  }

  console.log(
    `Successfully broadcasted momoka transaction with id ${momokaRelayResult.id}, momokaId: ${momokaRelayResult.momokaId}, proof: ${momokaRelayResult.proof}`
  );
}

main();
