import { ChangeProfileManagerActionType } from "@lens-protocol/client/src/graphql/types.generated";
import { getAuthenticatedClientFromEthersWallet } from "./shared/getAuthenticatedClient";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const wallet = setupWallet();
  const lensClient = await getAuthenticatedClientFromEthersWallet(wallet);

  const typedDataResult = await lensClient.profile.createChangeProfileManagersTypedData({
    approveLensManager: true,
    changeManagers: [
      {
        action: ChangeProfileManagerActionType.Add,
        address: "0x0000000000",
      },
    ],
  });

  const { id, typedData } = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  // broadcast onchain
  const broadcastOnchainResult = await lensClient.transaction.broadcastOnchain({
    id,
    signature: signedTypedData,
  });

  const onchainRelayResult = broadcastOnchainResult.unwrap();

  if (onchainRelayResult.__typename === "RelayError") {
    console.log(`Something went wrong`);
    return;
  }

  console.log(
    `Successfully changed profile managers with transaction with id ${onchainRelayResult}, txHash: ${onchainRelayResult.txHash}`
  );
}

main();
