import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.poaps.fetch({
    for: '0x04',
  });

  console.log(
    'Result: ',
    result.items.map((item) => item),
  );
}

main();
