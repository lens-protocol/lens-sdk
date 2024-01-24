import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.profile.followStatusBulk({
    followInfos: [
      {
        follower: '0x06', // is 0x06 following 0x38?
        profileId: '0x38',
      },
      {
        follower: '0x38', // is 0x38 following 0x06?
        profileId: '0x06',
      },
    ],
  });

  console.log(`Result: `, result);
}

main();
