import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const result = await lensClient.profile.setFollowModule({
    followModule: {
      freeFollowModule: true,
    },
  });

  // const result = await lensClient.profile.setFollowModule({
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

  // const result = await lensClient.profile.setFollowModule({
  //   followModule: {
  //     revertFollowModule: true,
  //   },
  // });

  // const result = await lensClient.profile.setFollowModule({
  //   followModule: {
  //     unknownFollowModule: {
  //       address: "0x0000000",
  //       data: "0x0000000",
  //     },
  //   },
  // });

  const followModuleResultValue = result.unwrap();

  if (!isRelaySuccess(followModuleResultValue)) {
    throw new Error("Failed to set follow module");
  }

  await lensClient.transaction.waitUntilComplete({ txId: followModuleResultValue.txId });
}

main();
