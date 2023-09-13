import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const profileId = "PROFILE_ID";

  const followRevenue = await lensClient.revenue.fromFollow({
    for: "PROFILE_ID",
  });

  console.log(
    `Follow revenue for profile with id: ${profileId} - ${JSON.stringify(followRevenue)}`
  );
}

main();
