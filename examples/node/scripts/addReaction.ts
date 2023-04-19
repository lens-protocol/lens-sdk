import { FeedEventItemType, ReactionTypes } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";
import { getActiveProfile } from "./shared/getActiveProfile";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);
  const profile = await getActiveProfile(lensClient, address);
  const profileId = profile.id;

  // fetch your feed
  const feedResult = await lensClient.feed.fetch(
    {
      profileId,
      feedEventItemTypes: [FeedEventItemType.Post],
      limit: 20,
    },
    profileId
  );

  const feedItems = feedResult.unwrap().items;

  // find first item without a reaction
  const feedItem = feedItems.find((item) => !item.root.reaction);

  if (!feedItem) {
    throw new Error(`You reacted to all feed items`);
  }

  // add reaction
  await lensClient.reactions.add({
    profileId,
    publicationId: feedItem.root.id,
    reaction: ReactionTypes.Upvote,
  });

  console.log(`You added a reaction to ${feedItem.root.id}`);
}

main();
