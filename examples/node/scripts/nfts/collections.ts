import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.nfts.collections({
    for: '0x06',
  });

  console.log('Result: ', result.items);
}

main();
