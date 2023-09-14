import { LensClient, LimitType, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profileId = 'PROFILE_ID';

  const feedHighlights = await client.feed.highlights({
    where: { for: profileId },
    limit: LimitType.Fifty,
  });

  console.log(`Feed highlights for ${profileId}`);
  feedHighlights.unwrap().items.map((item) => {
    console.log('Feed highlight item', JSON.stringify(item));
  });
}

main();
