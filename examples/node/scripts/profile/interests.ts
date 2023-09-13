import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  // add interests
  await lensClient.profile.addInterests({
    interests: ["TECHNOLOGY", "HEALTH_FITNESS__EXERCISE"],
  });

  // fetch all interests
  const { interests } = await lensClient.profile.fetch({
    profileId: "PROFILE_ID",
  });

  console.log(`Profile interests`, interests);

  // remove interests
  await lensClient.profile.removeInterests({
    interests: ["HEALTH_FITNESS__EXERCISE"],
  });
}

main();
