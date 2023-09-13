import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const metadata = {};

  const result = await client.publication.validateMetadata(metadata);

  if (!result.valid) {
    throw new Error(`Metadata is not valid because of ${result.reason}`);
  }

  console.log(`Result: `, result);
}

main();
