import { LensClient, PublicationTypes, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const profileId = "0x53a8";

  console.log(`Fetching all publications of profile: ${profileId} \n`);

  const pagination = await lensClient.publication.fetchAll({
    publicationTypes: [PublicationTypes.Post],
    profileId,
    limit: 2,
  });

  const publications = pagination.items; // first page items

  while (pagination.pageInfo.next) {
    console.log(`Fetching page for cursor: ${pagination.pageInfo.next}`);

    const nextPage = await pagination.next();
    publications.push(...nextPage.items);
  }

  console.log(
    `\nAll publications of profile: ${profileId}`,
    publications.map((i) => ({
      id: i.id,
    }))
  );
}

main();
