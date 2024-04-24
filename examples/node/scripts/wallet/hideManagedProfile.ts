import { LensClient, ManagedProfileVisibility, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

/**
 * Notice!
 * Hide managed profile feature works only for managed profiles that are not owned by the wallet.
 */

async function fetchManagedNotOwnedProfiles(client: LensClient, address: string) {
  const result = await client.wallet.profilesManaged({
    for: address,
    includeOwned: false, // important!
    hiddenFilter: ManagedProfileVisibility.NoneHidden,
  });

  console.log(
    `Profiles managed by ${address}: `,
    result.items.map((item) => ({
      id: item.id,
      handle: item.handle,
    })),
  );

  return result.items;
}

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const profiles = await fetchManagedNotOwnedProfiles(client, address);

  if (profiles.length === 0) {
    console.log('No managed profiles found');
    process.exit(0);
  }

  const profileIdToHide = profiles[0].id;

  // Hide the first managed profile
  console.log(`Hiding profile ${profileIdToHide} from managed profiles list`);

  await client.wallet.hideManagedProfile({
    profileId: profileIdToHide,
  });

  // Fetch managed profiles again
  await fetchManagedNotOwnedProfiles(client, address);

  // Unhide the profile
  console.log(`Unhiding profile ${profileIdToHide}`);

  await client.wallet.unhideManagedProfile({
    profileId: profileIdToHide,
  });

  // Fetch managed profiles again
  await fetchManagedNotOwnedProfiles(client, address);
}

main();
