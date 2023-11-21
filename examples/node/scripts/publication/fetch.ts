import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.publication.fetch({
    forId: '0x123-0x456',
  });

  console.log(`Publication fetched by id: `, result);
}

main();
