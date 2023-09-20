import {
  CustomFiltersType,
  LensClient,
  OpenActionCategoryType,
  OpenActionModuleType,
  development,
} from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  // stats across the whole protocol
  const protocolWideStats = await client.profile.stats({ request: { forProfileId: '0x01' } });

  console.log('Result: ', protocolWideStats);

  // stats for a specified apps
  const statsForSpecifiedApps = await client.profile.stats({
    request: { forProfileId: '0x01' },
    profileStatsArg: { forApps: ['APP_ID', 'ANOTHER_APP_ID'] },
  });

  console.log('Result: ', statsForSpecifiedApps);

  // filter open actions
  const filteredOpenActions = await client.profile.stats({
    request: { forProfileId: '0x01' },
    profileStatsCountOpenActionArgs: {
      anyOf: [
        {
          address: '0x00',
          type: OpenActionModuleType.SimpleCollectOpenActionModule,
          category: OpenActionCategoryType.Collect,
        },
      ],
    },
  });

  console.log('Result: ', filteredOpenActions);

  // stats for a specified app and with custom filters
  const customFilteredStats = await client.profile.stats({
    request: { forProfileId: '0x01' },
    profileStatsArg: { forApps: ['APP_ID'], customFilters: [CustomFiltersType.Gardeners] },
  });

  console.log('Result: ', customFilteredStats);
}

main();
