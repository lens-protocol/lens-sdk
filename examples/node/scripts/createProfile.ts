import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);

  const handle = Date.now().toString();

  console.log(`Creating a new profile for ${address} with handle "${handle}"`);

  const profileCreateResult = await lensClient.profile.create({ handle });

  // profileCreateResult is a Result object
  const profileCreateResultValue = profileCreateResult.unwrap();

  if (!isRelaySuccess(profileCreateResultValue)) {
    console.log(`Something went wrong`, profileCreateResultValue);
    return;
  }

  console.log(
    `Transaction to create a new profile with handle "${handle}" was successfuly broadcasted with txId ${profileCreateResultValue.txId}`
  );

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitForIsIndexed(profileCreateResultValue.txId);

  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
    limit: 10,
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
