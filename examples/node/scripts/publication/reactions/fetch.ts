import { LensClient, LimitType, PublicationReactionType, development } from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const profilesWhoReacted = await lensClient.publication.reactions.fetch({
    for: 'PUBLICATION_ID',
    limit: LimitType.TwentyFive,
  });

  console.log(
    `Profiles who reacted to publication: ${JSON.stringify(profilesWhoReacted, null, 2)}`,
  );

  await lensClient.publication.reactions.add({
    for: 'PUBLICATION_ID',
    reaction: PublicationReactionType.Upvote,
  });

  const profilesWhoReactedAfterUpvote = await lensClient.publication.reactions.fetch({
    for: 'PUBLICATION_ID',
    limit: LimitType.TwentyFive,
  });

  console.log(
    `Profiles who reacted to publication after upvote: ${JSON.stringify(
      profilesWhoReactedAfterUpvote,
      null,
      2,
    )}`,
  );
}

main();
