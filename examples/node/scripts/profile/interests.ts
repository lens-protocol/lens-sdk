import { LensClient, ProfileInterestTypes, development } from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  // add interests
  await lensClient.profile.addInterests({
    interests: [ProfileInterestTypes.Technology, ProfileInterestTypes.HealthFitnessExercise],
  });

  // fetch all interests
  const { interests } = await lensClient.profile.fetch({
    forProfileId: 'PROFILE_ID',
  });

  console.log(`Profile interests`, interests);

  // remove interests
  await lensClient.profile.removeInterests({
    interests: [ProfileInterestTypes.Technology],
  });
}

main();
