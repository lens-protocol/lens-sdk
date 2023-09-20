import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = '0x01';

  const result = await client.revenue.fromFollow({
    for: profileId,
  });

  console.log(`Follow revenue for profile with id: ${profileId}`, result);
}

main();
