import { LensClient, PublicationReactionType, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const feedResult = await lensClient.feed.fetch({
    where: {
      for: "PROFILE_ID",
    },
    limit: 20,
  });

  const feedItems = feedResult.unwrap().items;

  // find first item with a reaction
  const feedItem = feedItems.find((item) => item.reactions);

  if (!feedItem) {
    throw new Error(`You haven't reacted to anything`);
  }

  // add reaction
  await lensClient.reactions.remove({
    for: "PUBLICATION_ID",
    reaction: PublicationReactionType.Upvote,
  });

  console.log(`You remove a reaction from ${feedItem.root.id}`);
}

main();
