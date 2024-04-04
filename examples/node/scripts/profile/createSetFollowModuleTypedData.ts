import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const setFollowModuleTypedDataResult = await client.profile.createSetFollowModuleTypedData({
    followModule: {
      freeFollowModule: true,
    },
  });

  // const setFollowModuleTypedDataResult = await client.profile.createSetFollowModuleTypedData({
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

  // const setFollowModuleTypedDataResult = await client.profile.createSetFollowModuleTypedData({
  //   followModule: {
  //     revertFollowModule: true,
  //   },
  // });

  // const setFollowModuleTypedDataResult = await client.profile.createSetFollowModuleTypedData({
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
    data.typedData.value,
  );

  const broadcastResult = await client.transaction.broadcastOnchain({
    id: data.id,
    signature: signedTypedData,
  });

  const followBroadcastResultValue = broadcastResult.unwrap();

  if (!isRelaySuccess(followBroadcastResultValue)) {
    console.log(`Something went wrong`, followBroadcastResultValue);
    return;
  }

  console.log(
    `Profile follow module successfully set and successfully broadcasted with txId`,
    followBroadcastResultValue.txId,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: followBroadcastResultValue.txId });
}

main();
