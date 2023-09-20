import {
  getAuthenticatedClientFromEthersWallet,
  getOwnedProfileId,
} from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);
  const profileId = await getOwnedProfileId(client, wallet.address);

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
