import {
  LensClient,
  isCreateDataAvailabilityPublicationResult,
  isPostPublication,
} from "@lens-protocol/client";
import { setupWallet } from "./shared/setupWallet";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { getActiveProfile } from "./shared/getActiveProfile";
import { buildPublicationMetadata } from "./shared/buildPublicationMetadata";
import { uploadWithBundlr } from "./shared/uploadWithBundlr";
import { Wallet } from "ethers";

async function addMoreRecentPost(lensClient: LensClient, wallet: Wallet, profileId: string) {
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

  // fetch a create DA post typed data
  const createPostTypedDataResult =
    await lensClient.publication.createDataAvailabilityPostTypedData({
      from: profileId,
      contentURI,
    });

  const createPostTypedDataValue = createPostTypedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    createPostTypedDataValue.typedData.domain,
    createPostTypedDataValue.typedData.types,
    createPostTypedDataValue.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcastDataAvailability({
    id: createPostTypedDataValue.id,
    signature: signedTypedData,
  });

  // broadcastResult is a Result object
  const broadcastValue = broadcastResult.unwrap();

  if (!isCreateDataAvailabilityPublicationResult(broadcastValue)) {
    return false;
  }

  console.log("New post created with id:", broadcastValue.id);
  return true;
}

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);
  const profile = await getActiveProfile(lensClient, address);
  const profileId = profile.id;

  const publications = await lensClient.publication.fetchAll({
    profileId,
    limit: 1,
  });

  console.log(
    `Posts fetched:`,
    JSON.stringify(
      publications.items.map((i) => ({
        id: i.id,
      })),
      null,
      2
    )
  );

  await addMoreRecentPost(lensClient, wallet, profileId);

  const previous = await publications.prev();

  console.log(
    `First call to more recent posts with prev=${previous.pageInfo.prev}:\n`,
    JSON.stringify(
      previous.items.map((i) => ({
        id: i.id,
      })),
      null,
      2
    )
  );

  const secondTry = await publications.prev();

  console.log(
    `Second call to more recent posts with prev=${previous.pageInfo.prev}:\n`,
    JSON.stringify(
      secondTry.items.map((i) => ({
        id: i.id,
      })),
      null,
      2
    )
  );
}

main();
