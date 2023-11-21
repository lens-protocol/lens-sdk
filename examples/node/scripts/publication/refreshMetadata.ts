import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.publication.refreshMetadata({
    for: '0x123-0x456',
  });

  console.log(`Result: `, result);
}

main();
