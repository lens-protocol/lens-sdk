import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = '0x01';

  const result = await client.profile.managers({
    for: profileId,
  });

  console.log(`Managers for profile ${profileId}: `, result.items);
}

main();
