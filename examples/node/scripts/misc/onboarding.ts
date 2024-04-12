import {
  LensClient,
  LensTransactionStatusType,
  development,
  isRelaySuccess,
  isValidHandle,
} from '@lens-protocol/client';
import { MetadataAttributeType, profile as createProfileMetadata } from '@lens-protocol/metadata';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';

import abi from '../../abi/PermissonlessCreator.json';
import type { PermissonlessCreator } from '../../contracts/PermissonlessCreator';
import { uploadWithIrys } from '../shared/uploadWithIrys';

dotenv.config();

const typedAbi = abi as ethers.ContractInterface;

const permissonlessCreatorAddress = {
  development: '0x36440da1D98FF46637f0b98AAA082bc77977B49B',
  production: '0x0b5e6100243f793e480DE6088dE6bA70aA9f3872',
};

if (!process.env.INFURA_API_KEY) {
  throw new Error('Infura API key is not defined in .env file');
}

const rpcUrl = {
  development: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}`,
  production: `https://polygon.infura.io/v3/${process.env.INFURA_API_KEY}`,
};

async function main() {
  // prepare new handle
  const requestedHandle = 'jane_doe'; // input from the user

  // check if the requested handle is in a valid format
  if (!isValidHandle(requestedHandle)) {
    console.error(`Invalid handle:  ${requestedHandle}`);
    process.exit(1);
  }

  // init LensClient
  const client = new LensClient({
    environment: development,
  });

  // check if the requested handle is available
  const handleOwnerAddress = await client.handle.resolveAddress({
    handle: `lens/${requestedHandle}`,
  });

  if (handleOwnerAddress) {
    console.error(`The requested handle: ${requestedHandle} is not available.`);
    process.exit(1);
  }

  // init a provider to interact with the blockchain
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl.development);

  // prepare wallet of the new user
  if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error('Private key is not defined in .env file');
  }
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

  // init a contract to mint a new profile with the handle
  const permissonlessCreator = new ethers.Contract(
    permissonlessCreatorAddress.development,
    typedAbi,
    wallet,
  ) as PermissonlessCreator;

  // prepare a relayer address to enable signless experience
  const lensRelayerAddress = await client.transaction.generateLensAPIRelayAddress();

  // get the price to mint a new profile
  const price = await permissonlessCreator.getProfileWithHandleCreationPrice();

  // submit a tx to mint a new profile with the handle
  const tx = await permissonlessCreator.createProfileWithHandle(
    {
      to: wallet.address,
      followModule: '0x0000000000000000000000000000000000000000',
      followModuleInitData: '0x',
    },
    requestedHandle,
    [lensRelayerAddress],
    {
      value: price,
    },
  );

  console.log(
    `Transaction to create a new profile with handle "${requestedHandle}" was successfully broadcasted with hash`,
    tx.hash,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  const outcome = await client.transaction.waitUntilComplete({
    forTxHash: tx.hash,
  });

  if (outcome === null) {
    console.error(`The transaction with hash ${tx.hash} was lost.`);
    process.exit(1);
  }

  console.log('A new profile has been successfully minted.');

  // now fetch the newly created profile to get the id
  const fullHandle = `lens/${requestedHandle}`;

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
    signedBy: wallet.address,
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
  const metadataURI = await uploadWithIrys(metadata);
  // const metadataURI = 'https://arweave.net/cv2Rw4g9NhSEXFlq3Ekx1Xo7n76zQSnrx24uBODEkGg';
  console.log(`Metadata uploaded to Arweave with URI: ${metadataURI}`);

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
