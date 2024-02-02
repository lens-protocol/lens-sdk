import {
  CreateProfileWithHandleRequest,
  LensClient,
  LensTransactionStatusType,
  development,
  isRelaySuccess,
  isValidProfileHandle,
} from '@lens-protocol/client';
import { MetadataAttributeType, profile as createProfileMetadata } from '@lens-protocol/metadata';

import { setupWallet } from '../shared/setupWallet';
import { uploadWithBundlr } from '../shared/uploadWithBundlr';

// global client instance
const client = new LensClient({
  environment: development,
});

const HANDLE_NAMESPACE = 'test'; // use 'lens' namespace for production

/**
 * Validate a new handle for right format and availability
 *
 * @param handle - handle name without a namespace
 */
async function validateHandle(handle: string): Promise<boolean> {
  // is handle valid
  const isValid = isValidProfileHandle(handle);

  if (!isValid) {
    return false;
  }

  // is handle available
  const address = await client.handle.resolveAddress({ handle: `${HANDLE_NAMESPACE}/${handle}` }); // use 'lens' namespace for production

  return !address;
}

/**
 * Create a new profile with a handle
 */
async function createProfileWithHandle(request: CreateProfileWithHandleRequest): Promise<string> {
  const result = await client.wallet.createProfileWithHandle(request);

  if (!isRelaySuccess(result)) {
    throw new Error(`Something went wrong: ${result.reason}`);
  }

  console.log(
    `Transaction to create a new profile with handle "${request.handle}" was successfully broadcasted with txId`,
    result.txId,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: result.txId });

  // now fetch the newly created profile to get the id
  const fullHandle = `${HANDLE_NAMESPACE}/${request.handle}`;

  const profile = await client.profile.fetch({
    forHandle: fullHandle,
  });

  if (profile === null) {
    throw new Error(`Profile with handle "${fullHandle}" not found`);
  }

  return profile.id;
}

/**
 * Create and upload profile metadata json
 */
async function prepareProfileMetadata(): Promise<string> {
  const metadata = createProfileMetadata({
    name: 'Jane Doe',
    bio: 'I am a photographer based in New York City.',
    picture:
      'https://xirugirv3oxanetskoryfdjcnnmcz5isvjr2l2csy5s2sictfaza.arweave.net/uiNDIjXbrgaSclOjgo0ia1gs9RKqY6XoUsdlqSBTKDI',
    coverPicture: '',
    attributes: [
      {
        key: 'twitter',
        type: MetadataAttributeType.STRING,
        value: 'https://twitter.com/janedoexyz',
      },
    ],
  });

  const uri = await uploadWithBundlr(metadata);

  return uri;
}

/**
 * Use uploaded metadata URI to set profile metadata on the Lens protocol
 */
async function setProfileMetadata(metadataURI: string) {
  const result = await client.profile.setProfileMetadata({ metadataURI });

  // handle authentication errors
  if (result.isFailure()) {
    throw result.error; // CredentialsExpiredError or NotAuthenticatedError
  }

  const data = result.value;

  // handle relay errors
  if (!isRelaySuccess(data)) {
    throw new Error(`Something went wrong: ${data.reason}`);
  }

  // Optionally: wait for the tx to be mined and indexed
  const completion = await client.transaction.waitUntilComplete({ forTxId: data.txId });

  // handle mining/indexing errors
  if (completion?.status === LensTransactionStatusType.Failed) {
    console.error(completion.reason);
    return;
  }

  console.log('Profile Metadata updated!');
}

async function main() {
  // prepare wallet of a new user
  const wallet = setupWallet();
  const userAddress = await wallet.getAddress();

  // prepare new handle
  const requestedHandle = 'wagmi';

  const isValidHandle = await validateHandle(requestedHandle);
  if (!isValidHandle) {
    console.error('Invalid handle: ', requestedHandle);
    return;
  }

  // prepare a relayer address to enable signless experience
  // const lensRelayerAddress = await client.transaction.generateLensAPIRelayAddress();

  const profileId = await createProfileWithHandle({
    handle: requestedHandle,
    to: userAddress,
  });

  // authentication after the profile is minted
  const challenge = await client.authentication.generateChallenge({
    signedBy: userAddress,
    for: profileId,
  });
  const signature = await wallet.signMessage(challenge.text);
  await client.authentication.authenticate({ id: challenge.id, signature });

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());

  // create and set profile metadata
  const metadataURI = await prepareProfileMetadata();

  await setProfileMetadata(metadataURI);

  console.log('Profile setup complete!');
}

main();
