import { LensClient, ProfileInterestTypes, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  // add interests
  await client.profile.addInterests({
    interests: [ProfileInterestTypes.Technology, ProfileInterestTypes.HealthFitnessExercise],
  });

  // fetch all interests
  const { interests } = await client.profile.fetch({
    forProfileId: 'PROFILE_ID',
  });

  console.log(`Profile interests`, interests);

  // remove interests
  await client.profile.removeInterests({
    interests: [ProfileInterestTypes.Technology],
  });
}

main();
