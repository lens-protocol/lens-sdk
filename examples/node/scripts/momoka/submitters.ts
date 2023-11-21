import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.momoka.submitters();

  console.log('Result: ', result.items);
}

main();
