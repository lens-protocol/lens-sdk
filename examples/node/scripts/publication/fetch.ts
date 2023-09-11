import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const publicationById = await lensClient.publication.fetch({
    for: "0x0635",
  });

  console.log(`Publication fetched by id: `, publicationById);
}

main();
