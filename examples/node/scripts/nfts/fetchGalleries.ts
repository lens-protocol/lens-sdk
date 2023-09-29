import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.nfts.fetchGalleries({
    for: '0x01',
  });

  console.log('Result: ', result.items);
}

main();
