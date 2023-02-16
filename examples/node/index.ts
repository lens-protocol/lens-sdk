import LensClient, { mumbai, PublicationSortCriteria } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: mumbai,
  });

  const publications = await lensClient.explore.publications({
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
  });

  console.log(JSON.stringify(publications, null, 2));
}

main();
