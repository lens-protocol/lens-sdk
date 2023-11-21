import { LensClient, LimitType, development } from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const profilesWhoReacted = await client.publication.reactions.fetch({
    for: 'PUBLICATION_ID',
    limit: LimitType.TwentyFive,
  });

  console.log(
    `Profiles who reacted to publication: `,
    profilesWhoReacted.items.map((item) => ({
      profileId: item.profile.id,
      handle: item.profile.handle,
      reactions: item.reactions,
    })),
  );
}

main();
