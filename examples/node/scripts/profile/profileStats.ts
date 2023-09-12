import { getAuthenticatedClientFromEthersWallet } from "../shared/getAuthenticatedClient";
import { setupWallet } from "../shared/setupWallet";
import {
  CustomFiltersType,
  OpenActionCategoryType,
  OpenActionModuleType,
} from "@lens-protocol/client/src/graphql/types.generated";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  // stats across the whole protocol
  const protocolWideStats = await lensClient.profile.stats({ profileId: "PROFILE_ID" });

  // stats for a specified apps
  const statsForSpecifiedApps = await lensClient.profile.stats(
    {
      profileId: "PROFILE_ID",
    },
    { profileStatsArg: { forApps: ["APP_ID", "ANOTHER_APP_ID"] } }
  );

  // filter open actions
  const filteredOpenActions = await lensClient.profile.stats(
    {
      profileId: "PROFILE_ID",
    },
    {
      profileStatsCountOpenActionArgs: {
        anyOf: [
          {
            address: "0x00",
            type: OpenActionModuleType.SimpleCollectOpenActionModule,
            category: OpenActionCategoryType.Collect,
          },
        ],
      },
    }
  );

  // stats for a specified app and with custom filters
  const customFilteredStats = await lensClient.profile.stats(
    {
      profileId: "PROFILE_ID",
    },
    {
      profileStatsArg: { forApps: ["APP_ID"], customFilters: [CustomFiltersType.Gardeners] },
    }
  );
}

main();
