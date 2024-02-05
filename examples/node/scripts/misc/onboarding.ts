import {
  LensClient,
  LensTransactionStatusType,
  development,
  isRelaySuccess,
  isValidHandle,
} from '@lens-protocol/client';
import { MetadataAttributeType, profile as createProfileMetadata } from '@lens-protocol/metadata';

import { setupWallet } from '../shared/setupWallet';
import { uploadWithBundlr } from '../shared/uploadWithBundlr';

const HANDLE_NAMESPACE = 'test'; // use 'lens' namespace for production

// init LensClient
const client = new LensClient({
  environment: development,
});

async function main() {
  // prepare wallet of the new user
  const wallet = setupWallet();
  const userAddress = await wallet.getAddress();

  // prepare new handle
  const requestedHandle = 'janedoe'; // input from the user

  // check if the requested handle is in a valid format
  if (!isValidHandle(requestedHandle)) {
    console.error(`Invalid handle:  ${requestedHandle}`);
    process.exit(1);
  }

  // check if the requested handle is available
  const handleOwnerAddress = await client.handle.resolveAddress({
    handle: `${HANDLE_NAMESPACE}/${requestedHandle}`,
  });

  if (handleOwnerAddress) {
    console.error(`The requested handle: ${requestedHandle} is not available.`);
    process.exit(1);
  }

  // prepare a relayer address to enable signless experience
  // const lensRelayerAddress = await client.transaction.generateLensAPIRelayAddress();

  // create a new profile with a handle
  const createProfileResult = await client.wallet.createProfileWithHandle({
    handle: requestedHandle,
    to: userAddress,
  });

  if (!isRelaySuccess(createProfileResult)) {
    console.error(`Profile creation failed with the reason: ${createProfileResult.reason}`);
    process.exit(1);
  }

  console.log(
    `Transaction to create new profile with handle "${requestedHandle}" was successfully broadcasted with txId`,
    createProfileResult.txId,
  );
  console.log(`Waiting for the transaction to be indexed...`);
  const createProfileTxCompletion = await client.transaction.waitUntilComplete({
    forTxId: createProfileResult.txId,
  });

  // handle mining/indexing errors
  if (createProfileTxCompletion?.status === LensTransactionStatusType.Failed) {
    console.error(createProfileTxCompletion.reason);
    process.exit(1);
  }

  // now fetch the newly created profile to get the id
  const fullHandle = `${HANDLE_NAMESPACE}/${requestedHandle}`;

  const profile = await client.profile.fetch({
    forHandle: fullHandle,
  });

  // this should never happen
  if (profile === null) {
    console.error(`Profile with handle "${fullHandle}" not found`);
    process.exit(1);
  }

  // the profile with handle is minted, let's now authenticate them
  const challenge = await client.authentication.generateChallenge({
    signedBy: userAddress,
    for: profile.id,
  });
  const signature = await wallet.signMessage(challenge.text);
  await client.authentication.authenticate({ id: challenge.id, signature });

  console.log(
    `Is new profile ${profile.id} authenticated? `,
    await client.authentication.isAuthenticated(),
  );

  // now, prepare profile metadata using the metadata package
  const metadata = createProfileMetadata({
    name: 'Jane Doe',
    bio: 'I am a photographer based in New York City.',
    picture:
      'https://xirugirv3oxanetskoryfdjcnnmcz5isvjr2l2csy5s2sictfaza.arweave.net/uiNDIjXbrgaSclOjgo0ia1gs9RKqY6XoUsdlqSBTKDI',
    attributes: [
      {
        key: 'twitter',
        type: MetadataAttributeType.STRING,
        value: 'https://twitter.com/janedoexyz',
      },
    ],
  });

  // upload the metadata to Arweave
  const metadataURI = await uploadWithBundlr(metadata);
  console.log(`Metadata uploaded to Arweave with URI: ${metadataURI}`);
  // https://arweave.net/cv2Rw4g9NhSEXFlq3Ekx1Xo7n76zQSnrx24uBODEkGg

  // set the profile metadata on the Lens protocol
  const setProfileMetadataResult = await client.profile.setProfileMetadata({ metadataURI });

  if (setProfileMetadataResult.isFailure()) {
    // should never happen as we are authenticated
    console.error(setProfileMetadataResult.error.message);
    process.exit(1);
  }

  const setProfileMetadataValue = setProfileMetadataResult.value;

  // handle relay errors
  if (!isRelaySuccess(setProfileMetadataValue)) {
    throw new Error(
      `Setting profile metadata failed with the reason: ${setProfileMetadataValue.reason}`,
    );
  }

  console.log(
    `Transaction to set the profile metadata was successfully broadcasted with txId`,
    setProfileMetadataValue.txId,
  );

  // optionally: wait for the tx to be mined and indexed
  console.log(`Waiting for the transaction to be indexed...`);
  const metadataTxCompletion = await client.transaction.waitUntilComplete({
    forTxId: setProfileMetadataValue.txId,
  });

  // handle mining/indexing errors
  if (metadataTxCompletion?.status === LensTransactionStatusType.Failed) {
    console.error(metadataTxCompletion.reason);
    process.exit(1);
  }

  // end
  console.log('Onboarding complete!');
}

main();
