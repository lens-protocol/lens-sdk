import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const result = await client.transaction.generateLensAPIRelayAddress();

  console.log(`Lens API relay address: `, result);
}

main();
