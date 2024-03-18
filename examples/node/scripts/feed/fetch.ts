import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const result = await client.feed.fetch({
    where: {
      for: profileId,
    },
  });

  const value = result.unwrap();

  console.log(
    `Feed for ${profileId}`,
    value.items.map((item) => ({
      id: item.root.id,
      metadata: item.root.metadata,
    })),
  );
}

main();
