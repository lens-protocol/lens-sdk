import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { getOwnedProfileId } from '../shared/getOwnedProfileId';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await getOwnedProfileId(client, wallet.address);

  // fetch recommendations for a profile id
  const recommendedProfiles = await client.profile.recommendations({
    for: profileId,
  });

  console.log(
    `Recommended profiles: `,
    recommendedProfiles.items.map((i) => ({
      id: i.id,
      handle: i.handle,
    })),
  );

  if (recommendedProfiles.items.length === 0) {
    console.log(`No recommendations, exiting`);
    return;
  }

  //  dismiss one of the recommendations
  const recommendedProfileToDismiss = recommendedProfiles.items[0];
  console.log(`Dismissing recommendation of profile: ${recommendedProfileToDismiss.id}`);

  await client.profile.dismissRecommended({
    dismiss: [recommendedProfileToDismiss.id],
  });

  // and fetch recommendations again
  const newRecommendedProfiles = await client.profile.recommendations({
    for: profileId,
  });

  console.log(
    `Recommended profiles after dismissing: `,
    newRecommendedProfiles.items.map((i) => ({
      id: i.id,
      handle: i.handle,
    })),
  );
}

main();
