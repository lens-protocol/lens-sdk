import { LensClient, development, isMirrorPublication } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.publication.fetch({
    forId: '0x56-0x02',
  });

  if (result && isMirrorPublication(result)) {
    throw new Error(`Stats are not available for mirrors`);
  }

  console.log(`Stats for the publication: `, result?.stats);
}

main();
