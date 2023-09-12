import { LensClient, PublicationReactionType, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const feedResult = await lensClient.reactions.whoReacted({
    where: {
      for: "PROFILE_ID",
    },
    limit: 20,
  });

  const feedItems = feedResult.unwrap().items;

  // find first item without a reaction
  const feedItem = feedItems.find((item) => !item.reactions);

  if (!feedItem) {
    throw new Error(`You reacted to all feed items`);
  }

  // add reaction
  await lensClient.reactions.add({
    for: "PUBLICATION_ID",
    reaction: PublicationReactionType.Upvote,
  });

  console.log(`You added a reaction to ${feedItem.root.id}`);
}

main();
