import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.profile.following({
    for: '0x01',
  });

  console.log(
    `Following:`,
    result.items.map((p) => p.handle),
  );
}

main();
