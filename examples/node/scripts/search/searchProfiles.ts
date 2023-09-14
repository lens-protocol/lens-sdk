import { CustomFiltersType, LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const searchTerm = 'seachterm';

  const profileSearchResult = await client.search.profiles({
    query: searchTerm,
  });

  profileSearchResult.items.map((profile) => {
    console.log(
      `Profile found matching search term: "${searchTerm}":`,
      JSON.stringify(profile, null, 2),
    );
  });

  const profileSearchWithCustomFilterResult = await client.search.profiles({
    query: searchTerm,
    where: {
      customFilters: [CustomFiltersType.Gardeners],
    },
  });

  profileSearchWithCustomFilterResult.items.map((profile) => {
    console.log(
      `Profile found matching search term: "${searchTerm}" and custom filter of ${CustomFiltersType.Gardeners}:`,
      JSON.stringify(profile, null, 2),
    );
  });
}

main();
