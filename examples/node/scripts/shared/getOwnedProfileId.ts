import { LensClient } from '@lens-protocol/client';

export async function getOwnedProfileId(client: LensClient, address: string) {
  const ownedProfiles = await client.profile.fetchAll({ where: { ownedBy: [address] } });

  if (ownedProfiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  return ownedProfiles.items[0].id;
}
