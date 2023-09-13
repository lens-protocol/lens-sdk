import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.publication.tags({});

  console.log(`Result: `, result);
}

main();
