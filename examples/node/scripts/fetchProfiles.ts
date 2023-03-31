import { LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  // by profileIds
  const profilesById = await lensClient.profile.fetchAll({
    profileIds: ["0x0635"],
  });

  console.log(
    `Profiles fetched by ids: `,
    profilesById.items.map((i) => ({ id: i.id, handle: i.handle }))
  );

  // by ownedBy
  const address = "0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2";
  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
  });

  console.log(
    `Profiles owned by ${address}: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle }))
  );

  // by handles
  const profilesByHandle = await lensClient.profile.fetchAll({
    handles: ["pukkynext.test"],
  });

  console.log(
    `Profiles fetched by handles: `,
    profilesByHandle.items.map((i) => ({ id: i.id, handle: i.handle }))
  );

  // by whoMirroredPublicationId
  const profilesWhoMirroredPublicationId = await lensClient.profile.fetchAll({
    whoMirroredPublicationId: "0x0635-0x0f",
  });

  console.log(
    `Profiles who mirrored publication: `,
    profilesWhoMirroredPublicationId.items.map((i) => ({ id: i.id, handle: i.handle }))
  );
}

main();
