import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.nfts.mutualCollections({
    observer: '0x01',
    viewing: '0x02',
  });

  console.log('Result: ', result.items);
}

main();
