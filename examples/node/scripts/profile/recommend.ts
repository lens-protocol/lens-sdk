import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const recommendedProfileId = '0x01';

  await client.profile.recommend({
    profileId: recommendedProfileId,
  });

  const profile = await client.profile.fetch({
    forProfileId: recommendedProfileId,
  });

  console.log(
    `Is profile ${recommendedProfileId} recommended by me:`,
    profile?.peerToPeerRecommendedByMe,
  );

  await client.profile.unrecommend({
    profileId: recommendedProfileId,
  });

  const profileAfter = await client.profile.fetch({
    forProfileId: recommendedProfileId,
  });

  console.log(
    `Is profile ${recommendedProfileId} recommended by me:`,
    profileAfter?.peerToPeerRecommendedByMe,
  );
}

main();
