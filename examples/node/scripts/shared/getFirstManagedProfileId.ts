import { LensClient } from '@lens-protocol/client';

export async function getFirstManagedProfileId(client: LensClient, address: string) {
  const profiles = await client.wallet.profilesManaged({ for: address });

  if (profiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  return profiles.items[0].id;
}
