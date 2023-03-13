import { getActiveProfile } from "./shared/getActiveProfile";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);

  // query for one of profiles
  const activeProfile = await getActiveProfile(lensClient, address);

  // we need some typedData to sign and broadcast so let's set the dispatcher as an example
  const setDispatcherResult = await lensClient.profile.createSetDispatcherTypedData({
    profileId: activeProfile.id,
  });

  // setDispatcherResult is a Result object
  const data = setDispatcherResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  // broadcast
  const broadcastResult = await lensClient.transaction.broadcast({
    id: data.id,
    signature: signedTypedData,
  });

  // broadcastResult is a Result object
  const broadcastResultValue = broadcastResult.unwrap();

  if ("txId" in broadcastResultValue) {
    console.log(
      `Transaction to set dispatcher for profile ${activeProfile.id} was successfuly broadcasted with txId ${broadcastResultValue.txId}`
    );
  }

  // single check
  // const result = await lensClient.transaction.wasIndexed(broadcastResultValue.txId);

  // wait in a loop
  // await lensClient.transaction.waitForIsIndexed(broadcastResultValue.txId);

  // now the transaction is indexed for sure
  // const result = await lensClient.transaction.wasIndexed(broadcastResultValue.txId);
}

main();
