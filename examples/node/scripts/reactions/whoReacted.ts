import {
  ExplorePublicationsOrderByType,
  LensClient,
  PublicationReactionType,
  development,
} from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const profilesWhoReacted = await lensClient.reactions.fetch({
    for: "PUBLICATION_ID",
    limit: 20,
  });

  console.log(
    `Profiles who reacted to publication: ${JSON.stringify(profilesWhoReacted, null, 2)}`
  );

  await lensClient.reactions.add({
    for: "PUBLICATION_ID",
    reaction: PublicationReactionType.Upvote,
  });

  const profilesWhoReactedAfterUpvote = await lensClient.reactions.fetch({
    for: "PUBLICATION_ID",
    limit: 20,
  });

  console.log(
    `Profiles who reacted to publication after upvote: ${JSON.stringify(
      profilesWhoReactedAfterUpvote,
      null,
      2
    )}`
  );
}

main();
