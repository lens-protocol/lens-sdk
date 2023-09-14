import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = 'PROFILE_ID';

  const forYouFeedResult = await client.feed.forYou({
    for: profileId,
  });

  console.log(`For you feed for ${profileId}`);
  forYouFeedResult.unwrap().items.map((item) => {
    console.log(`For you feed item`, JSON.stringify(item));
  });
}

main();
