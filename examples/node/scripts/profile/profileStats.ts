import {
  CustomFiltersType,
  OpenActionCategoryType,
  OpenActionModuleType,
} from '@lens-protocol/client';

import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  // stats across the whole protocol
  const protocolWideStats = await lensClient.profile.stats({ profileId: 'PROFILE_ID' });

  console.log('Result: ', protocolWideStats);

  // stats for a specified apps
  const statsForSpecifiedApps = await lensClient.profile.stats(
    {
      profileId: 'PROFILE_ID',
    },
    { profileStatsArg: { forApps: ['APP_ID', 'ANOTHER_APP_ID'] } },
  );

  console.log('Result: ', statsForSpecifiedApps);

  // filter open actions
  const filteredOpenActions = await lensClient.profile.stats(
    {
      profileId: 'PROFILE_ID',
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
      profileId: 'PROFILE_ID',
    },
    {
      profileStatsArg: { forApps: ['APP_ID'], customFilters: [CustomFiltersType.Gardeners] },
    },
  );

  console.log('Result: ', customFilteredStats);
}

main();
