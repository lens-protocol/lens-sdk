import { isRelaySuccess } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { uploadWithBundlr } from "./shared/uploadWithBundlr";
import { getActiveProfile } from "./shared/getActiveProfile";
import { buildPublicationMetadata } from "./shared/buildPublicationMetadata";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);
  const profile = await getActiveProfile(lensClient, address);
  const profileId = profile.id;

  // prepare metadata
  const metadata = buildPublicationMetadata();

  // validate metadata
  const validateResult = await lensClient.publication.validateMetadata(metadata);

  if (!validateResult.valid) {
    throw new Error(`Metadata is not valid.`);
  }

  // upload metadata to
  const contentURI = await uploadWithBundlr(metadata);

  console.log(`Post metadata was uploaded to ${contentURI}`);

  // create a post via dispatcher, you need to have the dispatcher enabled for the profile
  const createPostResult = await lensClient.publication.createPostViaDispatcher({
    profileId,
    contentURI,
    collectModule: {
      revertCollectModule: true, // collect disabled
    },
    referenceModule: {
      followerOnlyReferenceModule: false, // anybody can comment or mirror
    },
  });

  // createPostResult is a Result object
  const createPostResultValue = createPostResult.unwrap();

  if (!isRelaySuccess(createPostResultValue)) {
    console.log(`Something went wrong`, createPostResultValue);
    return;
  }

  console.log(
    `Transaction to create a post was successfuly broadcasted with txId ${createPostResultValue.txId}`
  );

  // wait in a loop
  console.log(`Waiting for the transaction to be indexed...`);
  await lensClient.transaction.waitForIsIndexed(createPostResultValue.txId);

  // now the transaction is indexed
  const wasIndexedFinalCheck = await lensClient.transaction.wasIndexed(createPostResultValue.txId);
  console.log(`Transaction status: `, wasIndexedFinalCheck.unwrap());
}

main();
