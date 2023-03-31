import { CollectModules, FollowModules, ReferenceModules } from "@lens-protocol/client";
import { getAuthenticatedClient } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClient(wallet);

  const currenciesResult = await lensClient.modules.fetchEnabledCurrencies();
  const currencies = currenciesResult.unwrap();

  console.log("Enabled currencies: ", currencies.map((c) => c.symbol).join(", "));

  const modulesResult = await lensClient.modules.fetchEnabled();
  const modules = modulesResult.unwrap();

  console.log(
    "\nEnabled collect modules: ",
    modules.collectModules.map((m) => m.moduleName).join(", ")
  );
  console.log(
    "\nEnabled follow modules: ",
    modules.followModules.map((m) => m.moduleName).join(", ")
  );
  console.log(
    "\nEnabled reference modules: ",
    modules.referenceModules.map((m) => m.moduleName).join(", ")
  );

  const allowanceResult = await lensClient.modules.approvedAllowanceAmount({
    currencies: currencies.map((c) => c.address),
    collectModules: [CollectModules.LimitedFeeCollectModule],
    followModules: [FollowModules.FeeFollowModule],
    referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
  });

  console.log("\nApproved allowance amount: ", allowanceResult.unwrap());

  const approvalDataResult = await lensClient.modules.generateCurrencyApprovalData({
    currency: currencies[0].address,
    value: "10",
    collectModule: CollectModules.LimitedFeeCollectModule,
  });

  console.log("\nApproval data: ", approvalDataResult.unwrap());
}

main();
