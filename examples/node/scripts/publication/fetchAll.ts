import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const profileId = "0x0635";
  const publications = await lensClient.publication.fetchAll({
    where: {
      from: [profileId],
    },
  });

  console.log(
    `Publications from profileId ${profileId}: `,
    publications.items.map((p) => ({
      id: p.id,
    }))
  );
}

main();
