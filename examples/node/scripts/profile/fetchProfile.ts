import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  // by id
  const profileById = await lensClient.profile.fetch({
    profileId: "0x0635",
  });

  console.log(`Profile fetched by id: `, { id: profileById.id, handle: profileById.handle });

  // by handle
  const profileByHandle = await lensClient.profile.fetch({
    handle: "lensprotocol.test",
  });

  console.log(`Profile fetched by handle: `, {
    id: profileByHandle.id,
    handle: profileByHandle.handle,
  });
}

main();
