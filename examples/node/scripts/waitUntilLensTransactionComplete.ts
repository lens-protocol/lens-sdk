import { LensClient, isRelaySuccess } from "@lens-protocol/client";
import { Wallet } from "ethers";
import { getAuthenticatedClientFromEthersWallet } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function signTypedDataAndBroadcast(lensClient: LensClient, wallet: Wallet) {
  const typedDataResult = await lensClient.profile.createOnChainSetProfileMetadataTypedData({
    metadataURI: "your-metadata-uri",
  });

  const data = typedDataResult.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const broadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResult);
    return;
  }

  return broadcastResultValue;
}

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const broadcastResult = await signTypedDataAndBroadcast(lensClient, wallet);

  const result = await lensClient.transaction.waitUntilComplete({ txId: broadcastResult.txId });

  if (result.isFailure()) {
    console.log(`Something went wrong`, result);
    return;
  }

  const transactionStatusResult = result.value;

  if (transactionStatusResult.__typename === "LensTransaction") {
    console.log(
      `LensTransaction successfully completed 
    `,
      {
        txId: broadcastResult.txId,
        txHash: broadcastResult.txHash,
        lensTransactionStatus: transactionStatusResult.status,
        reason: transactionStatusResult.reason,
        extraInfo: transactionStatusResult.extraInfo,
      }
    );
    return;
  }

  console.log(`LensMetadataTransaction successfully completed`, {
    txId: broadcastResult.txId,
    txHash: broadcastResult.txHash,
    // a: transactionStatusResult.
    lensTransactionStatus: transactionStatusResult.status,
    extraInfo: transactionStatusResult.extraInfo,
    metadataFailedReason: transactionStatusResult.metadataFailedReason,
  });
}

main();
