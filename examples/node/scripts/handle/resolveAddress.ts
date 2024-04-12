import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const address = await client.handle.resolveAddress({ handle: 'lens/wagmi' });

  console.log(`Address: `, address);
}

main();
