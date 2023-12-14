import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.modules.fetchMetadata({
    implementation: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
  });

  console.log('Result: ', result);
}

main();
