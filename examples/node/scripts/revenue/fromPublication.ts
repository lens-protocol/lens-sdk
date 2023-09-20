import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const publications = await client.publication.fetchAll();

  const firstPublication = publications.items[0];

  const publicationRevenue = await client.revenue.fromPublication({
    for: firstPublication.id,
  });

  console.log(`Revenue for publication with id: ${firstPublication.id}`, publicationRevenue);
}

main();
