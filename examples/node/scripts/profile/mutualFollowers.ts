import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.profile.mutualFollowers({
    observer: '0x01',
    viewing: '0x02',
  });

  console.log(
    `Mutual followers: `,
    result.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
