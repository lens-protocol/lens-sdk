import { FeedEventItemType, ReactionTypes } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const lensClient = await getAuthenticatedClient(wallet);

  // fetch your profile id
  const ownedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
    limit: 1,
  });

  if (ownedProfiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  const profileId = ownedProfiles.items[0].id;

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
