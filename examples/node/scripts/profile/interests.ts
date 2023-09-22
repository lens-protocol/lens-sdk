import { ProfileInterestTypes } from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { getOwnedProfileId } from '../shared/getOwnedProfileId';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await getOwnedProfileId(client, wallet.address);

  // add interests
  await client.profile.addInterests({
    interests: [ProfileInterestTypes.Technology, ProfileInterestTypes.HealthFitnessExercise],
  });

  // fetch all interests
  const { interests } = await client.profile.fetch({
    forProfileId: profileId,
  });

  console.log(`Profile interests`, interests);

  // remove interests
  await client.profile.removeInterests({
    interests: [ProfileInterestTypes.Technology],
  });
}

main();
