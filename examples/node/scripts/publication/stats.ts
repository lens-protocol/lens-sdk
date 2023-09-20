import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.publication.stats({
    request: {
      forId: '0x04-0x0b',
    },
  });

  console.log(`Stats for the publication: `, result);
}

main();
