import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.profile.followers({
    of: '0x01',
  });

  console.log(
    `Followers:`,
    result.items.map((p) => p.handle),
  );
}

main();
