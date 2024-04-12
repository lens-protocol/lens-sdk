import { isRelaySuccess } from '@lens-protocol/client';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';

import abi from '../../../abi/LensHub.json';
import type { LensHub } from '../../../contracts/LensHub';
import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';

dotenv.config();

// prepare direct contract call in case of non-sponsored profile
const typedAbi = abi as ethers.ContractInterface;

const lensHubAddress = {
  development: '0xA2574D9DdB6A325Ad2Be838Bd854228B80215148',
  production: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
};

if (!process.env.INFURA_API_KEY) {
  throw new Error('Infura API key is not defined in .env file');
}

const rpcUrl = {
  development: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}`,
  production: `https://polygon.infura.io/v3/${process.env.INFURA_API_KEY}`,
};

async function main() {
  if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error('Private key is not defined in .env file');
  }
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl.development);
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

  const client = await getAuthenticatedClient(wallet);

  // I have metadata already uploaded for simplicity
  const metadataURI = 'https://arweave.net/cv2Rw4g9NhSEXFlq3Ekx1Xo7n76zQSnrx24uBODEkGg';

  // profile id of the authenticated user
  const profileId = await client.authentication.getProfileId();

  // fetch full profile
  const profile = await client.profile.fetch({
    forProfileId: profileId,
  });

  if (!profile) {
    // should never happen
    console.error(`Profile with id ${profileId} does not exist`);
    return;
  }

  console.log(
    `Profile ${profileId} ${profile.handle?.fullHandle}:
     - is signless experience enabled: ${profile.signless}
     - is sponsored: ${profile.sponsor}
     `,
  );

  if (!profile.sponsor) {
    // call the contract directly, pay gas yourself
    const lensHub = new ethers.Contract(lensHubAddress.development, typedAbi, wallet) as LensHub;

    const tx = await lensHub.setProfileMetadataURI(profile.id, metadataURI);

    console.log(`Submitted a tx with a hash: `, tx.hash);

    console.log(`Waiting for tx to be mined and indexed...`);
    const outcome = await client.transaction.waitUntilComplete({
      forTxHash: tx.hash,
    });

    if (outcome === null) {
      // if the transaction was sped up, the hash would have changed
      console.error('The transaction was not found');
      return;
    }

    console.log(`Profile metadata updated!`);
    return;
  }

  // check if the profile has signless enabled aka. enabled lens profile manager
  if (profile.signless) {
    // singless experience, just use profile.setProfileMetadata
    const result = await client.profile.setProfileMetadata({
      metadataURI,
    });

    const data = result.unwrap();

    if (!isRelaySuccess(data)) {
      console.log(`Something went wrong`, data);
      return;
    }

    console.log(`Waiting for the transaction to be indexed...`);
    await client.transaction.waitUntilComplete({ forTxId: data.txId });
  } else {
    // we have to use profile.createSetProfileMetadataTypedData, sign with wallet and broadcast
    const typedDataResult = await client.profile.createSetProfileMetadataTypedData({
      metadataURI,
    });

    // typedDataResult is a Result object
    const data = typedDataResult.unwrap();

    // sign with the wallet
    const signedTypedData = await wallet._signTypedData(
      data.typedData.domain,
      data.typedData.types,
      data.typedData.value,
    );

    // broadcast
    console.log(`Broadcasting the transaction...`);
    const broadcastResult = await client.transaction.broadcastOnchain({
      id: data.id,
      signature: signedTypedData,
    });

    // broadcastResult is a Result object
    const broadcastResultValue = broadcastResult.unwrap();

    if (!isRelaySuccess(broadcastResultValue)) {
      console.log(`Something went wrong`, broadcastResultValue);
      return;
    }

    console.log(`Waiting for the transaction to be indexed...`);
    await client.transaction.waitUntilComplete({ forTxId: broadcastResultValue.txId });
  }

  console.log(`Profile metadata updated!`);
}

main();
