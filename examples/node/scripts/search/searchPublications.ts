import { CustomFiltersType, LensClient, PublicationType, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const searchTerm = 'seachterm';

  const searchPostsForSearchTermResult = await client.search.publications({
    query: searchTerm,
    where: {
      publicationTypes: [PublicationType.Post],
    },
  });

  searchPostsForSearchTermResult.items.map((publication) => {
    console.log(
      `Publication of type Post found matching search term: "${searchTerm}":`,
      JSON.stringify(publication, null, 2),
    );
  });

  const searchPublicationsForSearchTermAndFilters = await client.search.publications({
    query: searchTerm,
    where: {
      customFilters: [CustomFiltersType.Gardeners],
      publishedOn: ['app-id'],
    },
  });

  searchPublicationsForSearchTermAndFilters.items.map((profile) => {
    console.log(
      `Publication found matching search term: "${searchTerm}" and custom filters:`,
      JSON.stringify(profile, null, 2),
    );
  });
}

main();
