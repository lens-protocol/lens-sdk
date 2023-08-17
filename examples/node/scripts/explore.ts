import { ExplorePublicationsOrderByType, LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const publications = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.Latest,
  });

  console.log(
    `Publications to explore: `,
    publications.items.map((i) => ({ id: i.id, handle: i.metadata }))
  );
}

main();
