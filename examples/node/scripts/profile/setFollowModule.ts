import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.profile.setFollowModule({
    followModule: {
      freeFollowModule: true,
    },
  });

  // const result = await client.profile.setFollowModule({
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

  // const result = await client.profile.setFollowModule({
  //   followModule: {
  //     revertFollowModule: true,
  //   },
  // });

  // const result = await client.profile.setFollowModule({
  //   followModule: {
  //     unknownFollowModule: {
  //       address: "0x0000000",
  //       data: "0x0000000",
  //     },
  //   },
  // });

  const followModuleResultValue = result.unwrap();

  if (!isRelaySuccess(followModuleResultValue)) {
    throw new Error('Failed to set follow module');
  }

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: followModuleResultValue.txId });
}

main();
