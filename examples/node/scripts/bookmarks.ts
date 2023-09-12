import { isRelaySuccess, LensClient, ProfileFragment } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function createProfile(client: LensClient): Promise<ProfileFragment> {
  const handle = Date.now().toString();

  console.log(`Creating ${handle}.test...`);

  const profileCreateResult = await client.profile.createWithHandle({ handle });

  const profileCreateResultValue = profileCreateResult.unwrap();

  if (!isRelaySuccess(profileCreateResultValue)) {
    console.log(`Something went wrong`, profileCreateResultValue);
    return;
  }

  console.log(`Waiting for the transaction ${profileCreateResultValue.txHash} to be indexed...`);
  await client.transaction.waitForIsIndexed(profileCreateResultValue.txId);

  return client.profile.fetch({ handle: `${handle}.test` });
}

async function main() {
  // setup
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const client = await getAuthenticatedClient(wallet);

  const profile = await createProfile(client);

  const before = await client.bookmarks.fetch({ profileId: profile.id });

  console.log(`Initial ${profile.handle} bookmarks: `, before.items.length);

  const addResult = await client.bookmarks.add({
    profileId: profile.id,
    publicationId: "0x0635-0x0f",
  });

  if (addResult.isFailure()) {
    console.log(`Something went wrong`, addResult.unwrap());
    return;
  }

  const after = await client.bookmarks.fetch({ profileId: profile.id });

  console.log(`${profile.handle} bookmarks after adding one: `, after.items.length);

  const removeResult = await client.bookmarks.remove({
    profileId: profile.id,
    publicationId: "0x0635-0x0f",
  });

  if (removeResult.isFailure()) {
    console.log(`Something went wrong`, removeResult.unwrap());
    return;
  }

  const ultimately = await client.bookmarks.fetch({ profileId: profile.id });

  console.log(`${profile.handle} bookmarks after removing one: `, ultimately.items.length);
}

main();
