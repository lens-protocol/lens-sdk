import { LensClient, LimitType, PublicationType, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = '0x1b';

  console.log(`Fetching all posts of profile: ${profileId} \n`);

  const pagination = await client.publication.fetchAll({
    limit: LimitType.Ten,
    where: {
      from: [profileId],
      publicationTypes: [PublicationType.Post],
    },
  });

  const publications = pagination.items; // first page items

  console.log(
    `\nFirst page:`,
    publications.map((i) => ({
      id: i.id,
    })),
  );

  while (pagination.pageInfo.next) {
    console.log(`Fetching page for cursor: ${pagination.pageInfo.next}`);

    const nextPage = await pagination.next();

    if (nextPage) {
      publications.push(...nextPage.items);

      console.log(
        `Next page:`,
        nextPage.items.map((i) => ({
          id: i.id,
        })),
      );
    }
  }

  console.log(
    `\nAll posts of profile: ${profileId}`,
    publications.map((i) => ({
      id: i.id,
    })),
  );
}

main();
