import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.poaps.event({
    eventId: '0x04',
  });

  console.log('Result: ', result);
}

main();
