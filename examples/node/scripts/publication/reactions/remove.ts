import { PublicationReactionType } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const feedResult = await client.feed.fetch({
    where: {
      for: 'PROFILE_ID',
    },
  });

  const feedItems = feedResult.unwrap().items;

  // find first item with a reaction
  const feedItem = feedItems.find((item) => item.reactions);

  if (!feedItem) {
    throw new Error(`You haven't reacted to anything`);
  }

  // add reaction
  await client.publication.reactions.remove({
    for: 'PUBLICATION_ID',
    reaction: PublicationReactionType.Upvote,
  });

  console.log(`You remove a reaction from ${feedItem.root.id}`);
}

main();
