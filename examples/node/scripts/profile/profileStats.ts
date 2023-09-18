import {
  CustomFiltersType,
  LensClient,
  OpenActionCategoryType,
  OpenActionModuleType,
  development,
} from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  // stats across the whole protocol
  const protocolWideStats = await lensClient.profile.stats({ forProfileId: '0x20' });

  console.log('Result: ', protocolWideStats);

  // stats for a specified apps
  const statsForSpecifiedApps = await lensClient.profile.stats(
    {
      forProfileId: '0x20',
    },
    { profileStatsArg: { forApps: ['APP_ID', 'ANOTHER_APP_ID'] } },
  );

  console.log('Result: ', statsForSpecifiedApps);

  // filter open actions
  const filteredOpenActions = await lensClient.profile.stats(
    {
      forProfileId: '0x20',
    },
    {
      profileStatsCountOpenActionArgs: {
        anyOf: [
          {
            address: '0x00',
            type: OpenActionModuleType.SimpleCollectOpenActionModule,
            category: OpenActionCategoryType.Collect,
          },
        ],
      },
    },
  );

  console.log('Result: ', filteredOpenActions);

  // stats for a specified app and with custom filters
  const customFilteredStats = await lensClient.profile.stats(
    {
      forProfileId: '0x20',
    },
    {
      profileStatsArg: { forApps: ['APP_ID'], customFilters: [CustomFiltersType.Gardeners] },
    },
  );

  console.log('Result: ', customFilteredStats);
}

main();
