import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  // by id
  const profileById = await client.profile.fetch({
    forProfileId: '0x01',
  });

  console.log(`Profile fetched by id: `, { id: profileById?.id, handle: profileById?.handle });

  // by handle
  const profileByHandle = await client.profile.fetch({
    forHandle: 'lens/firstprofile',
  });

  console.log(`Profile fetched by handle: `, {
    id: profileByHandle?.id,
    handle: profileByHandle?.handle,
  });
}

main();
