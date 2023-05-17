import { LensClient, isPostPublication, production } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: production,
  });

  const publications = await lensClient.publication.fetchAll({
    publicationIds: ["0x014e11-0x01be", "0x018615-0x22"],
  });

  const posts = publications.items.filter(isPostPublication);

  console.log(
    `Posts fetched by ids: `,
    JSON.stringify(
      posts.map((i) => ({
        id: i.id,
        metadata: i.metadata,
      })),
      null,
      2
    )
  );
}

main();
