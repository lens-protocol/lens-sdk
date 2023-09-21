import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const searchTerm = 'text';

  const result = await client.search.publications({
    query: searchTerm,
    where: {},
  });

  console.log(
    'Search result: ',
    result.items.map((item) => ({
      id: item.id,
      metadata: item.metadata,
    })),
  );
}

main();
