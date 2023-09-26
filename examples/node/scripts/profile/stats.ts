import {
  LensClient,
  OpenActionCategoryType,
  OpenActionFilter,
  development,
} from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const modules = await client.modules.supportedOpenActionModules();

  const result = await client.profile.fetch(
    { forProfileId: '0x01' },
    {
      profileStatsCountOpenActionArgs: {
        anyOf: [
          {
            address: modules.items[0].contract.address,
          },
          {
            category: OpenActionCategoryType.Collect,
          },
        ] as OpenActionFilter[],
      },
    },
  );

  console.log(`Result: `, {
    id: result.id,
    handle: result.handle,
    stats: result.stats,
  });
}

main();
