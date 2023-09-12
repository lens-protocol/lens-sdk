import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const handle = Date.now().toString();

  console.log(`Creating a new profile for ${address} with handle "${handle}"`);

  const profileCreateResult = await lensClient.profile.createWithHandle({
    handle: handle,
    to: "YOUR_EVM_ADDRESS",
  });

  // profileCreateResult is a Result object
  const profileCreateResultValue = profileCreateResult.unwrap();

  if (!isRelaySuccess(profileCreateResultValue)) {
    console.log(`Something went wrong`, profileCreateResultValue);
    return;
  }

  console.log(
    `Transaction to create a new profile with handle "${handle}" was successfuly broadcasted with txId ${profileCreateResultValue.txId}`
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitUntilComplete({ txId: profileCreateResultValue.txId });

  const allOwnedProfiles = await lensClient.profile.fetchAll({
    where: {
      ownedBy: [address],
    },
  });

  console.log(
    `All owned profiles: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle }))
  );

  const newProfile = allOwnedProfiles.items.find((item) => item.handle === `${handle}.test`);

  if (newProfile) {
    console.log(`The newly created profile's id is: ${newProfile.id}`);
  }
}

main();
