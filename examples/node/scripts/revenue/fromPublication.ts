import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const publicationRevenue = await lensClient.revenue.fromPublication({
    for: 'PUBLICATION_ID',
  });

  console.log(
    `Publication revenue for publication with id: ${
      publicationRevenue.publication.id
    } - ${JSON.stringify(publicationRevenue.revenue)}`,
  );
}

main();
