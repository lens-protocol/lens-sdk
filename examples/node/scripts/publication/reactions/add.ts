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

  // find first item without a reaction
  const feedItem = feedItems.find((item) => !item.reactions);

  if (!feedItem) {
    throw new Error(`You reacted to all feed items`);
  }

  // add reaction
  await client.publication.reactions.add({
    for: 'PUBLICATION_ID',
    reaction: PublicationReactionType.Upvote,
  });

  console.log(`You added a reaction to ${feedItem.root.id}`);
}

main();
