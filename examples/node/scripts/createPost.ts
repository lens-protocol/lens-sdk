import { v4 } from "uuid";
import { PublicationMainFocus, PublicationMetadataDisplayTypes } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { uploadWithBundlr } from "./shared/uploadWithBundlr";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);

  // fetch your profile id
  const ownedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
    limit: 1,
  });

  if (ownedProfiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  const profileId = ownedProfiles.items[0].id;

  // prepare metadata
  const metadata = {
    appId: "lenster",
    attributes: [
      {
        displayType: PublicationMetadataDisplayTypes.String,
        traitType: "Created with",
        value: "LensClient SDK",
      },
    ],
    content: "Post created with LensClient SDK",
    description: "Description of the post created with LensClient SDK",
    locale: "en-US",
    mainContentFocus: PublicationMainFocus.TextOnly,
    metadata_id: v4(),
    name: "Post created with LensClient SDK",
    tags: ["lens-sdk"],
    version: "2.0.0",
  };

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

  if ("txId" in createPostResultValue) {
    console.log(
      `Transaction to create a post was successfuly broadcasted with txId ${createPostResultValue.txId}`
    );
  }
}

main();
