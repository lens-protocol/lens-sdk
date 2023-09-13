import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  // fetch recommendations for a profile id
  const recommendedProfiles = await lensClient.profile.recommendations({
    for: 'PROFILE_ID',
  });

  console.log(
    `Recommended profiles: `,
    recommendedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  //  dismiss one of the recommendations
  const recommendedProfileToDismiss = recommendedProfiles.items[0];
  console.log(`Dismissing recommendation of profile: ${recommendedProfileToDismiss.id}`);

  await lensClient.profile.dismissRecommended({ dismiss: [recommendedProfileToDismiss.id] });

  // and fetch recommendations again
  const newRecommendedProfiles = await lensClient.profile.recommendations({
    for: 'PROFILE_ID',
  });

  console.log(
    `Recommended profiles after dismissing: `,
    newRecommendedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
