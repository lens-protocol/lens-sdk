import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClient(wallet);

  // fetch recommendations for the authenticated wallet
  const recommendedProfiles = await lensClient.profile.allRecommended();

  console.log(
    `Recommended profiles: `,
    recommendedProfiles.map((i) => ({ id: i.id, handle: i.handle }))
  );

  // let's dismiss one of the recommendations
  console.log(`Dismissing recommendation of profile: ${recommendedProfiles[0].id}`);

  await lensClient.profile.dismissRecommended({ profileIds: [recommendedProfiles[0].id] });

  // and fetch recommendations again
  const newRecommendedProfiles = await lensClient.profile.allRecommended();

  console.log(
    `Recommended profiles after dismissing: `,
    newRecommendedProfiles.map((i) => ({ id: i.id, handle: i.handle }))
  );
}

main();
