import {
  FeedEventItemType,
  LensClient,
  PublicationMetadataMainFocusType,
  development,
} from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = 'PROFILE_ID';

  const feedResult = await client.feed.fetch({
    where: {
      for: 'PROFILE_ID',
    },
  });

  console.log(`Feed for ${profileId}`);
  feedResult.unwrap().items.map((item) => {
    console.log(`Feed item ${item.id}`);
    console.log(`>> Root publication ${JSON.stringify(item.root)}`);
    console.log(`>> Comments ${JSON.stringify(item.comments)}`);
    console.log(`>> Mirrors ${JSON.stringify(item.mirrors)}`);
    console.log(`>> Reactions ${JSON.stringify(item.reactions)}`);
  });

  const articlePostOnlyFeedResult = await client.feed.fetch({
    where: {
      for: 'PROFILE_ID',
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Article],
      },
      feedEventItemTypes: [FeedEventItemType.Post],
    },
  });

  console.log(
    `Article post only feed for ${profileId}`,
    JSON.stringify(articlePostOnlyFeedResult.unwrap()),
  );

  const actionOnlyFeed = await client.feed.fetch({
    where: {
      feedEventItemTypes: [FeedEventItemType.Acted],
    },
  });

  console.log(`Action only feed for ${profileId}`, JSON.stringify(actionOnlyFeed.unwrap()));
}

main();
