import { isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
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
    // TODO submit tx on chain
    console.log(`Profile is not sponsored`);
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
