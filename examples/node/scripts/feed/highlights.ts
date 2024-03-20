import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  const result = await client.feed.highlights({
    where: {
      for: profileId,
    },
  });

  const value = result.unwrap();

  console.log(
    `Feed highlights for ${profileId}`,
    value.items.map((item) => ({
      id: item.id,
      metadata: item.metadata,
    })),
  );
}

main();
