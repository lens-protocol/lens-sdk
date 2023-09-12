import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const setFollowModuleTypedDataResult = await lensClient.profile.createSetFollowModuleTypedData({
    followModule: {
      freeFollowModule: true,
    },
  });

  // const setFollowModuleTypedDataResult = await lensClient.profile.createSetFollowModuleTypedData({
  //   followModule: {
  //     feeFollowModule: {
  //       amount: {
  //         currency: "MATIC",
  //         value: "0.01",
  //       },
  //       recipient: "0x0000000",
  //     },
  //   },
  // });

  // const setFollowModuleTypedDataResult = await lensClient.profile.createSetFollowModuleTypedData({
  //   followModule: {
  //     revertFollowModule: true,
  //   },
  // });

  // const setFollowModuleTypedDataResult = await lensClient.profile.createSetFollowModuleTypedData({
  //   followModule: {
  //     unknownFollowModule: {
  //       address: "0x0000000",
  //       data: "0x0000000",
  //     },
  //   },
  // });

  const data = setFollowModuleTypedDataResult.unwrap();

  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcastOnChain({
    id: data.id,
    signature: signedTypedData,
  });

  const followBroadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Profile follow module sucessfully set and successfully broadcasted with txId ${followBroadcastResultValue.txId}`
  );

  // wait for follow to be indexed
  await lensClient.transaction.waitUntilComplete({ txId: followBroadcastResultValue.txId });
}

main();
