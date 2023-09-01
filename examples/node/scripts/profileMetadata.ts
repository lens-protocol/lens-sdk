import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { LensTransactionStatusType } from "@lens-protocol/client/src/graphql/types.generated";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const typedDataResult = await lensClient.profile.createOnChainSetProfileMetadataTypedData({
    metadataURI: "your-metadata-uri",
  });

  // typedDataResult is a Result object
  const data = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  // broadcast
  const broadcastResult = await lensClient.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  // broadcastResult is a Result object
  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    return;
  }

  const result = await lensClient.transaction.status({ txId: broadcastResultValue.txId });

  if (!result.isSuccess()) {
    console.log(`Something went wrong`, result);
    return;
  }

  const isCompleted = result.value.status === LensTransactionStatusType.Complete;

  // or wait till transaction is indexed
  await lensClient.transaction.waitUntilComplete({ txId: broadcastResultValue.txId });

  console.log(`Transaction was successfully broadcasted with txId ${broadcastResultValue.txId}`);
}

main();
