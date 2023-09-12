import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = "0x0635";
  const result = await client.publication.fetchAll({
    where: {
      from: [profileId],
    },
  });

  console.log(
    `Publications from profileId ${profileId}: `,
    result.items.map((p) => ({
      id: p.id,
    }))
  );
}

main();
