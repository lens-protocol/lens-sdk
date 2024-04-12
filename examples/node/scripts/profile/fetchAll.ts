import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  // by list of profile ids
  const profilesById = await client.profile.fetchAll({
    where: { profileIds: ['0x01'] },
  });

  console.log(
    `Profiles fetched by ids: `,
    profilesById.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  // by wallet address profiles are owned by
  const address = '0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2';
  const allOwnedProfiles = await client.profile.fetchAll({
    where: { ownedBy: [address] },
  });

  console.log(
    `Profiles owned by address: ${address}: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  // by a list of Lens handles
  const profilesByHandle = await client.profile.fetchAll({
    where: { handles: ['lens/firstprofile'] },
  });

  console.log(
    `Profiles fetched by handles: `,
    profilesByHandle.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  // by which profiles have mirrored a publication
  const profilesWhoMirroredPublicationId = await client.profile.fetchAll({
    where: { whoMirroredPublication: '0x0635-0x0f' },
  });

  console.log(
    `Profiles who mirrored publication: `,
    profilesWhoMirroredPublicationId.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  // by which profiles have quoted a publication
  const profilesWhoQuotedPublicationId = await client.profile.fetchAll({
    where: { whoQuotedPublication: '0x0635-0x0f' },
  });

  console.log(
    `Profiles who quoted publication: `,
    profilesWhoQuotedPublicationId.items.map((i) => ({ id: i.id, handle: i.handle })),
  );

  // by which profiles have commented on a publication
  const profilesWhoCommentedPublicationId = await client.profile.fetchAll({
    where: { whoCommentedOn: '0x0635-0x0f' },
  });

  console.log(
    `Profiles who commented publication: `,
    profilesWhoCommentedPublicationId.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
