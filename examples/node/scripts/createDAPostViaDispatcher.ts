import { isCreateDataAvailabilityPublicationResult } from "@lens-protocol/client";
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
  const metadata = buildPublicationMetadata({
    content: "Data Availability Post created with LensClient SDK",
    name: "Data Availability Post created with LensClient SDK",
  });

  // validate metadata
  const validateResult = await lensClient.publication.validateMetadata(metadata);

  if (!validateResult.valid) {
    throw new Error(`Metadata is not valid.`);
  }

  // upload metadata to
  const contentURI = await uploadWithBundlr(metadata);

  console.log(`Post metadata was uploaded to ${contentURI}`);

  // create a post via dispatcher, you need to have the dispatcher enabled for the profile
  const createPostResult = await lensClient.publication.createDataAvailabilityPostViaDispatcher({
    from: profileId,
    contentURI,
  });

  // createPostResult is a Result object
  const createPostResultValue = createPostResult.unwrap();

  if (!isCreateDataAvailabilityPublicationResult(createPostResultValue)) {
    console.log(`Something went wrong`, createPostResultValue);
    return;
  }

  console.log(`DA post was created: `, createPostResultValue);

  // DA post is created instantly, so we can also comment on it right away
  const createCommentResult =
    await lensClient.publication.createDataAvailabilityCommentViaDispatcher({
      from: profileId,
      contentURI,
      commentOn: createPostResultValue.id,
    });

  const createCommentResultValue = createCommentResult.unwrap();

  if (!isCreateDataAvailabilityPublicationResult(createCommentResultValue)) {
    console.log(`Something went wrong`, createCommentResultValue);
    return;
  }

  console.log(`DA comment was created too: `, createCommentResultValue);
}

main();
